const Pool = require("pg").Pool;
const ResponseClass = require('../helpers/response');
const pool = require("../db/pool");

const createMovieBooking = (request, response, next) => {
  const { firstName, lastName, movieShowingId } = request.body ?? {};

  if (!firstName || !lastName || !movieShowingId) {
    return response.status(400).json({
      code: 400,
      message: "Missing required fields",
      data: null,
    });
  }

  const showingId = Number(movieShowingId);
  if (!Number.isInteger(showingId)) {
    return response.status(400).json({
      code: 400,
      message: "Invalid movieShowingId",
      data: null,
    });
  }

  pool.query(
    `
    INSERT INTO movie_bookings (first_name, last_name, movie_showing_id)
    VALUES ($1, $2, $3)
    RETURNING id
    `,
    [firstName, lastName, showingId],
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
