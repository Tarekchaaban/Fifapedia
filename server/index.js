require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/teamsearch/:teamname', (req, res) => {
  fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?search=${req.params.teamname}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3e6df72b18msh42bd29bf1a7c124p1c6cfbjsn347a96b426a4',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => res.status(200).json(data))
    .catch(err => console.error('Fetch Failed!', err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
