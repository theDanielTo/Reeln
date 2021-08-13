require('dotenv/config');
const express = require('express');
const db = require('./db');
const argon2 = require('argon2'); // eslint-disable-line
const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const app = express();
app.use(staticMiddleware);
app.use(express.json());

app.post('/api/auth/sign-up', uploadsMiddleware, (req, res, next) => {
  const { firstName, lastName, email, city, state, username, password } = req.body;
  if (!firstName || !lastName || !username || !password) {
    throw new ClientError(400, 'missing required fields');
  }
  argon2
    .hash(password)
    .then(hashedPw => {
      const sql = `
        INSERT into "users"
          ("firstName", "lastName", "email", "city", "state",
          "username", "hashedPw", "avatar")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        returning *
      `;
      const params = [
        firstName, lastName, email, city, state,
        username, hashedPw, 'default-avatar.jpg'
      ];
      db.query(sql, params)
        .then(result => res.status(201).json(result.rows[0]))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    SELECT *
      FROM "users"
    WHERE "username" = $1
  `;
  const param = [username];
  db.query(sql, param)
    .then(result => {
      const [user] = result.rows;
      if (!user) throw new ClientError(401, 'invalid login');
      const {
        userId, firstName, lastName, email,
        city, state, username, hashedPw
      } = user;
      argon2
        .verify(hashedPw, password)
        .then(isMatching => {
          if (!isMatching) throw new ClientError(401, 'invalid login');
          const payload = {
            userId, firstName, lastName, email, city, state, username, hashedPw
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.status(200).json({ token, user: payload });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/users', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) throw new ClientError(401, 'no user with that userId');
  const sql = `
    SELECT *
      FROM "users"
    WHERE "userId" = $1
  `;
  const param = [userId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/users/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const sql = `
    SELECT *
      FROM "users"
    WHERE "userId" = $1
  `;
  const param = [userId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/users/upload', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const url = req.file.filename;
  const sql = `
    UPDATE "users"
      SET "avatar" = $1
    WHERE "userId" = $2
  `;
  const params = [url, userId];
  db.query(sql, params)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/tourneys/open', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    SELECT DISTINCT "tourneyId", "tourneyName",
            "tourneyImg", "maxParticipants",
            TO_CHAR("startDate", 'Mon DD, YYYY') AS "startDate",
            TO_CHAR("endDate", 'Mon DD, YYYY') AS "endDate"
      FROM "tournaments" AS "t"
      JOIN "participants" AS "p" USING ("tourneyId")
      WHERE "p"."userId" != $1
        AND "t"."userId" != $1
        AND "closed" = false
        AND "endDate" > now()
      ORDER BY "endDate"
  `;
  const param = [userId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/tourneys/past', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    SELECT DISTINCT "t"."tourneyId", "tourneyName", "tourneyImg",
            TO_CHAR("startDate", 'Mon DD, YYYY') AS "startDate",
            TO_CHAR("endDate", 'Mon DD, YYYY') AS "endDate"
      FROM "participants" AS "p"
      JOIN "tournaments" AS "t" USING ("tourneyId")
      WHERE "endDate" < now() AND "p"."userId" = $1
      ORDER BY "endDate"
  `;

  const param = [userId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/tourneys/current', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    SELECT DISTINCT "t"."tourneyId", "tourneyName",
            "tourneyImg", "maxParticipants",
            TO_CHAR("startDate", 'Mon DD, YYYY') AS "startDate",
            TO_CHAR("endDate", 'Mon DD, YYYY') AS "endDate"
      FROM "tournaments" AS "t"
      JOIN "participants" AS "p" USING ("tourneyId")
      WHERE "endDate" > now() AND "p"."userId" = $1
      ORDER BY "endDate"
  `;
  const param = [userId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/tourneys/counts', (req, res, next) => {
  const sql = `
    SELECT "tourneyId", count(*) AS "numParticipants"
      FROM "participants" AS "p"
      JOIN "tournaments" AS "t" USING ("tourneyId")
      GROUP BY "tourneyId"
      ORDER BY "tourneyId"
  `;
  db.query(sql)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.post('/api/tourney/create', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;

  const {
    tourneyName, startDate, endDate,
    closed, maxParticipants,
    minWeight, maxWeight,
    heaviestFive,
    perPound, pointsPerPound,
    heaviest, pointsHeaviest,
    longest, pointsLongest,
    mostCaught, pointsMostCaught,
    additionalRules
  } = req.body;

  if (!tourneyName || !startDate || !endDate || !closed) {
    throw new ClientError(400, 'missing required fields');
  }

  const url = req.file.filename;

  const sql = `
    INSERT into "tournaments"
      ("userId", "tourneyName", "tourneyImg",
      "startDate", "endDate", "closed", "maxParticipants",
      "minWeight", "maxWeight",
      "heaviestFive",
      "perPound", "pointsPerPound",
      "heaviest", "pointsHeaviest",
      "longest", "pointsLongest",
      "mostCaught", "pointsMostCaught",
      "additionalRules")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18, $19)
    returning *
  `;

  const params = [
    userId, tourneyName, url,
    startDate, endDate, closed, maxParticipants,
    minWeight, maxWeight,
    heaviestFive === 'true',
    perPound === 'true', pointsPerPound,
    heaviest === 'true', pointsHeaviest,
    longest === 'true', pointsLongest,
    mostCaught === 'true', pointsMostCaught,
    additionalRules
  ];

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/tourneys/:tourneyId', (req, res, next) => {
  const tourneyId = parseInt(req.params.tourneyId, 10);
  if (!tourneyId) throw new ClientError(401, 'no tourney with that tourneyId');

  const sql = `
    SELECT "tourneyId", "userId",
          "tourneyName", "tourneyImg",
          TO_CHAR("startDate", 'Mon DD, YYYY') as "startDate",
          TO_CHAR("endDate", 'Mon DD, YYYY') as "endDate",
          "closed", "maxParticipants",
          "minWeight", "maxWeight",
          "heaviestFive",
          "perPound", "pointsPerPound",
          "heaviest", "pointsHeaviest",
          "longest", "pointsLongest",
          "mostCaught", "pointsMostCaught",
          "additionalRules"
      FROM "tournaments"
    WHERE "tourneyId" = $1
  `;
  const param = [tourneyId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/participants/:tourneyId', (req, res, next) => {
  const tourneyId = parseInt(req.params.tourneyId, 10);
  if (!tourneyId) throw new ClientError(401, 'no tourney with that tourneyId');

  const sql = `
    SELECT "userId", "score", "firstName", "lastName", "avatar"
      FROM "participants"
      JOIN "users" AS "u" USING ("userId")
    WHERE "tourneyId" = $1
    ORDER BY "score" DESC
  `;
  const param = [tourneyId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/catches/:tourneyId', (req, res, next) => {
  const tourneyId = parseInt(req.params.tourneyId, 10);
  if (!tourneyId) throw new ClientError(401, 'no tourney with that tourneyId');

  const sql = `
    SELECT "firstName", "lastName",
          "catchId", "photo", "weight",
          TO_CHAR("dateCaught", 'Mon DD, YYYY') as "dateCaught"
      FROM "catches"
      JOIN "users" USING ("userId")
    WHERE "tourneyId" = $1

  `;
  const param = [tourneyId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.post('/api/tourneys/join/:tourneyId', (req, res, next) => {
  const tourneyId = parseInt(req.params.tourneyId, 10);
  if (!tourneyId) throw new ClientError(401, 'no tourney with that tourneyId');

  const { userId } = req.user;
  const sql = `
    INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES ($1, $2, 0, 1)
  `;
  const param = [userId, tourneyId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.post('/api/catches/log/:tourneyId', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const tourneyId = parseInt(req.params.tourneyId, 10);
  if (!tourneyId) throw new ClientError(401, 'no tourney with that tourneyId');

  const { dateCaught, weight, length } = req.body;
  if (!dateCaught) {
    throw new ClientError(400, 'dateCaught is a required field');
  }
  const url = req.file.filename;

  const sql = `
    INSERT into "catches"
          ("userId", "tourneyId", "dateCaught",
          "weight", "length", "photo")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const params = [userId, tourneyId, dateCaught, parseFloat(weight), length, url];
  db.query(sql, params)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.patch('/api/participants/addScore', (req, res, next) => {
  const { userId } = req.user;
  const { score, tourneyId } = req.body;
  const sql = `
    UPDATE "participants"
      SET "score" = "score" + $1
    WHERE "userId" = $2 AND "tourneyId" = $3
    RETURNING *
  `;
  const params = [score, userId, tourneyId];
  db.query(sql, params)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
