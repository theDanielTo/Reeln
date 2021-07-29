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
          ("firstName", "lastName",
          "email", "city", "state",
          "username", "hashedPw")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        returning *
      `;
      const params = [firstName, lastName, email, city, state, username, hashedPw];
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
    SELECT "t"."tourneyId", "tourneyName", "closed", "maxParticipants",
            TO_CHAR("startDate", 'Mon DD, YYYY') as "startDate",
            TO_CHAR("endDate", 'Mon DD, YYYY') as "endDate"
      FROM "participants" AS "p"
      JOIN "tournaments" AS "t" USING ("tourneyId")
      WHERE "p"."userId" != $1 AND "t"."userId" != $1 AND "endDate" > now()
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
    SELECT "t"."tourneyId", "tourneyName", "closed", "p"."standing",
            TO_CHAR("startDate", 'Mon DD, YYYY') as "startDate",
            TO_CHAR("endDate", 'Mon DD, YYYY') as "endDate"
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
    SELECT "t"."tourneyId", "tourneyName", "closed", "maxParticipants",
            TO_CHAR("startDate", 'Mon DD, YYYY') as "startDate",
            TO_CHAR("endDate", 'Mon DD, YYYY') as "endDate"
      FROM "participants" AS "p"
      JOIN "tournaments" AS "t" USING ("tourneyId")
      WHERE "endDate" > now() AND "p"."userId" = $1
      ORDER BY "endDate"
  `;
  const param = [userId];
  db.query(sql, param)
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
    heaviestFive === 'false',
    perPound === 'false', pointsPerPound,
    heaviest === 'false', pointsHeaviest,
    longest === 'false', pointsLongest,
    mostCaught === 'false', pointsMostCaught,
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
  const sql = `
    SELECT *
      FROM "participants"
    WHERE "tourneyId" = $1
  `;
  const param = [tourneyId];
  db.query(sql, param)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/count', (req, res, next) => {
  const sql = `
    SELECT "tourneyId" AS "tId", count("userId") AS "numParticipants"
    FROM "participants"
    GROUP BY "tourneyId"
    ORDER BY "tourneyId";
  `;
  db.query(sql)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.post('/api/tourneys/join/:tourneyId', (req, res, next) => {
  const tourneyId = parseInt(req.params.tourneyId, 10);
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

app.post('/api/catches/log', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const {
    tourneyId, dateCaught, weight, length
  } = req.body;
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

app.patch('/api/participants', (req, res, next) => {
  const { userId } = req.user;
  const { catchScore, tourneyId } = req.body;
  const sql = `
    UPDATE "participants"
      SET "score" = "score" + $1
    WHERE "userId" = $2 AND "tourneyId" = $3
    RETURNING *
  `;
  const params = [catchScore, userId, tourneyId];
  db.query(sql, params)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
