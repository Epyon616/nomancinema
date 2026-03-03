CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) UNIQUE, 
  description VARCHAR(255), 
  duration_minutes INTEGER
);
CREATE TABLE IF NOT EXISTS movie_showings (
  id SERIAL PRIMARY KEY, 
  showing_time TIMESTAMP, 
  movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS movie_bookings (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  movie_showing_id INTEGER NOT NULL REFERENCES movie_showings(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_movie_showings_movie_id ON movie_showings(movie_id);
CREATE INDEX IF NOT EXISTS idx_movie_bookings_showing_id ON movie_bookings(movie_showing_id);