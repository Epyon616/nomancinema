const Pool = require("pg").Pool;
const ResponseClass = require('../helpers/response');
const pool = require("../db/pool");

const getMovieShowingsByMovieId = (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id)) {
    return response.status(400).json({
      code: 400,
      message: "Invalid movie id",
      data: null,
    });
  }

  pool.query(
    "SELECT * FROM movie_showings WHERE movie_id = $1 ORDER BY id ASC",
    [id],
    (error, results) => {
      if (error) return next(error);

      if (results.rows.length === 0) {
        return response.status(404).json({
          code: 404,
          message: "No showings found for movie",
          data: [],
        });
      }

      return response.status(200).json({
        code: 200,
        message: "Showings retrieved",
        data: results.rows,
      });
    }
  );
};

module.exports = { getMovieShowingsByMovieId }