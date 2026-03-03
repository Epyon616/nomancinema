const Pool = require("pg").Pool;
const ResponseClass = require('../helpers/response');

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'db',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

const createMovieBooking = (request, response) => {
  const { firstName, lastName, movieId, movieShowingId } = request.body ?? {};

  if (!firstName || !lastName || !movieId || !movieShowingId) {
    return response.status(400).json({
      code: 400,
      message: "Missing required fields",
      data: null,
    });
  }

  pool.query(
    `
    INSERT INTO movie_bookings (first_name, last_name, movie_id, movie_showing_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `,
    [firstName, lastName, movieId, movieShowingId],
    (error, results) => {
      if (error) return next(error);

      return response.status(201).json({
        code: 201,
        message: "Booking confirmed",
        data: { bookingId: results.rows[0]?.id ?? null },
      });
    }
  );
};

module.exports = { createMovieBooking } 
