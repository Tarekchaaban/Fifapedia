require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/fifapedia',
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/teamsearch/:teamname', (req, res) => {
  fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?search=${req.params.teamname}`, {
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

app.get('/api/teams', (req, res) => {
  const sql = `
    select *
      from "teams"
     order by "entryId" desc
  `;
  db.query(sql)
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
