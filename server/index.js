require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const jsonMiddleware = express.json();
const ClientError = require('./client-error');
const argon2 = require('argon2');
const pg = require('pg');
const jwt = require('jsonwebtoken');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/fifapedia',
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2.hash(password)
    .then(hashedPassword => {

      const sql = `
        insert into "users" ("username", "hashedPassword")
             values ($1, $2)
          returning "userId", "username";
      `;

      const params = [username, hashedPassword];
      db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows[0]);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }

  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;

  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'Invalid username or password');
      }
      const { userId } = user;

      argon2.verify(user.hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'Invalid username or password');
          }
          const payload = { username, userId };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.status(200).json({ token, user: payload });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));

});

app.get('/api/teamsearch/:teamname', (req, res, next) => {
  fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?search=${req.params.teamname}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => res.status(500).json({ err: err.message }));
});

app.get('/api/players/:teamId/:season', (req, res) => {
  fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${req.params.teamId}&season=${req.params.season}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => res.status(200).json(data))
    .catch(err => console.error('Fetch Failed!', err));
});
app.get('/api/players/:playerId/:teamId/:season', (req, res) => {
  fetch(`https://api-football-v1.p.rapidapi.com/v3/players?id=${req.params.playerId}&team=${req.params.teamId}&season=${req.params.season}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => res.status(200).json(data))
    .catch(err => console.error('Fetch Failed!', err));
});

app.post('/api/teams', (req, res) => {
  const sql = `
  insert into "teams" ("teamId", "teamName", "crestUrl", "userId")
  values ($1, $2, $3, $4)
  returning *;`;
  const valuesArray = [req.body.currentTeam.team.id, req.body.currentTeam.team.name, req.body.currentTeam.team.logo, req.body.currentUser];
  db.query(sql, valuesArray)
    .then(result => {
      res.status(201);
      res.json(result.rows);

    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });

});

app.delete('/api/teams/:entryId', (req, res) => {
  const entryId = req.params.entryId;
  if (entryId < 1) {
    return (
      res.status(400).json({
        error: 'Invalid EntryId'
      })
    );
  }
  const sql = `
  delete
  from "teams"
  where "entryId" = $1
  returning *
  `;
  const valuesArray = [entryId];
  db.query(sql, valuesArray)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `Cannot find team with ${entryId}`
        });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
});

app.use(authorizationMiddleware);

app.get('/api/teams', (req, res) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "teams"
      where "userId" = $1
     order by "entryId" desc
  `;
  const valuesArray = [userId];
  db.query(sql, valuesArray)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
