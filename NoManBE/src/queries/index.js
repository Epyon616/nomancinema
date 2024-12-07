const { getMovies, getMovieById } = require('./movies');
const { getMovieShowingsByMovieId } = require('./movieShowings');
const { createMovieBooking } = require('./movieBookings');

module.exports = {
  getMovies,
  getMovieById,
  getMovieShowingsByMovieId,
  createMovieBooking
}