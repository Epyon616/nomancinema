CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) UNIQUE, 
  description VARCHAR(255), 
  duration_minutes INTEGER
);
CREATE TABLE IF NOT EXISTS movie_showings (
  id SERIAL PRIMARY KEY, 
  showing_time TIMESTAMP, 
  movie_id INTEGER 
  REFERENCES movies (id)
);
CREATE TABLE IF NOT EXISTS movie_bookings (
  id SERIAL, 
  first_name VARCHAR(50), 
  last_name VARCHAR(100), 
  movie_showing_id INTEGER 
  REFERENCES movie_showings (id), 
  movie_id INTEGER 
  REFERENCES movies (id)
);