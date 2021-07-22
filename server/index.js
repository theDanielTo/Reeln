require('dotenv/config');
const argon2 = require('argon2'); // eslint-disable-line
const express = require('express');
const pg = require('pg');
const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({ // eslint-disable-line
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(staticMiddleware);
app.use(express.json());

app.post('/api/auth/sign-up', (req, res, next) => {
  const { firstName, lastName, userLocation, username, password } = req.body;
  if (!firstName || !lastName || !username || !password) {
    throw new ClientError(400, 'missing required fields');
  }
  argon2
    .hash(password)
    .then(hashedPw => {
      const sql = `
        INSERT into "users" ("firstName", "lastName", "location", "username", "hashedPw")
        VALUES ($1, $2, $3, $4, $5)
        returning *
      `;
      const params = [firstName, lastName, userLocation, username, hashedPw];
      db.query(sql, params)
        .then(result => res.status(201).json(result.rows))
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
    SELECT "userId", "hashedPw"
      FROM "users"
     WHERE "username" = $1
  `;
  const param = [username];
  db.query(sql, param)
    .then(result => {
      const [user] = result.rows;
      if (!user) throw new ClientError(401, 'invalid login');
      argon2
        .verify(user.hashedPw, password)
        .then(isMatching => {
          if (!isMatching) throw new ClientError(401, 'invalid login');
          const payload = {
            userId: user.userId,
            username: username
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.status(200).json({ token, user: payload });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
