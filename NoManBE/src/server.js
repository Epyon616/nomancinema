const express = require('express');
const bodyParser = require('body-parser');
const { getMovies, getMovieById } = require('./database/queries/movies');
const {getMovieShowingsByMovieId } = require('./database/queries/movieShowings');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (request, response) => {
  response.json({
    info: 'Welcome to the No Man Cinema API'
  });
});

app.get('/api/movies', getMovies);
app.get('/api/movies/:id', getMovieById);

app.get('/api/movie-showings/:id', getMovieShowingsByMovieId);

module.exports = app;