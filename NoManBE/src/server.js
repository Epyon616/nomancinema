const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { 
  getMoviesList, 
  getMovieById, 
  getMovieShowingsByMovieId, 
  createMovieBooking 
} = require('./queries');
const pool = require("./db/pool");

const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (request, response) => {
  response.json({
    info: 'Welcome to the No Man Cinema API'
  });
});

app.get('/api/movies', getMoviesList);
app.get('/api/movies/:id', getMovieById);

app.get('/api/movie-showings/:id', getMovieShowingsByMovieId);

app.post('/api/movie-booking', createMovieBooking);

module.exports = app;

process.on("SIGTERM", async () => {
  await pool.end();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await pool.end();
  process.exit(0);
});