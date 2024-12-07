const Pool = require("pg").Pool;
const ResponseClass = require('../helpers/response');

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'db',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

const createMovieBooking = (request, response) => {
  const { firstName, lastName, movieId, movieShowingId } = request.body;

  pool.quert(
    'INSERT INTO movie_bookings (first_name, last_name, movie_id, movie_showing_id) VALUES ($1, $2, $3, $4', 
    [firstName, lastName, movieId, movieShowingId], (error, results) => {
      if (error) throw error;
      console.log(results);
      response.status(201).send("Booking confirmed");
    }
  );
}

module.exports = { createMovieBooking } 
