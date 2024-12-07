const Pool = require("pg").Pool;
const ResponseClass = require('../../helpers/response');

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'db',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

const getMovieShowingsByMovieId = (request, response) => {
  const returnedResponse = new ResponseClass();
  const id = parseInt(request.params.id);

  pool.query('SELECT * from movie_showings WHERE movie_id = $1 ORDER BY id ASC', [id], (error, results) => {
    if (error) throw error;
  
    if (results.rowCount === 0) {
      returnedResponse.status = true;
      returnedResponse.code = 404;
      returnedResponse.message = "No Showings available for this movie";
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

module.exports = { getMovieShowingsByMovieId }