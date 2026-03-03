const { getMoviesList, getMovieById } = require('./movies');
const { getMovieShowingsByMovieId } = require('./movieShowings');
const { createMovieBooking } = require('./movieBookings');

module.exports = {
  getMoviesList,
  getMovieById,
  getMovieShowingsByMovieId,
  createMovieBooking
}