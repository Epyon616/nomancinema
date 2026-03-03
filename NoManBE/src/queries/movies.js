const Pool = require("pg").Pool;
const ResponseClass = require('../helpers/response');

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'db',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

const getMoviesList = (request, response) => {
  pool.query("SELECT * FROM movies ORDER BY id ASC", (error, results) => {
    if (error) return next(error);

    return response.status(200).json({
      code: 200,
      message: "Movies list retrieved",
      data: results.rows,
    });
  });
};

const getMovieById = (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id)) {
    return response.status(400).json({
      code: 400,
      message: "Invalid movie id",
      data: null,
    });
  }

  pool.query("SELECT * FROM movies WHERE id = $1", [id], (error, results) => {
    if (error) return next(error);

    if (results.rows.length === 0) {
      return response.status(404).json({
        code: 404,
        message: "Movie not found",
        data: null,
      });
    }

    return response.status(200).json({
      code: 200,
      message: "Movie retrieved",
      data: results.rows[0],
    });
  });
};

module.exports = { getMoviesList, getMovieById }