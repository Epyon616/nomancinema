const Pool = require("pg").Pool;
const ResponseClass = require('../helpers/response');

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'db',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

const getMovies = (request, response) => {
  const returnedResponse = new ResponseClass();

  pool.query('SELECT * FROM movies ORDER BY id ASC', (error, results) => {
    if (error) throw error;

    returnedResponse.status = true;
    returnedResponse.code = 200;
    returnedResponse.message = "Success";
    returnedResponse.data = results.rows;

    response.status(200).json(returnedResponse);
  });
}

const getMovieById = (request, response) => {
  const returnedResponse = new ResponseClass();
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM movies WHERE id = $1',[id], (error, results) => {
    if (error) throw error;
  
    if (results.rowCount === 0) {
      returnedResponse.status = true;
      returnedResponse.code = 404;
      returnedResponse.message = "Movie not found";
      returnedResponse.data = null;
    } else {
      returnedResponse.status = true;
      returnedResponse.code = 200;
      returnedResponse.message = "Success";
      returnedResponse.data = results.rows;
    }


    response.status(200).json(returnedResponse);
  });
}

module.exports = { getMovies, getMovieById }