CREATE TABLE IF NOT EXISTS movies (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE);
CREATE TABLE IF NOT EXISTS movie_showings (id SERIAL PRIMARY KEY, time SMALLINT, movie_id INTEGER REFERENCES movies (id));
CREATE TABLE IF NOT EXISTS movie_bookings (id SERIAL, first_name VARCHAR(50), last_name VARCHAR (100), movie_showing_id INTEGER REFERENCES movie_showings (id), movie_id INTEGER REFERENCES movies (id));
INSERT into movies (name) values ('Spooderman'), ('Ghostbusters'), ('Rord of the Lings'), ('Bongespob');
INSERT into movie_showings (time, movie_id) values (900, 1), (1200, 1), (1400, 1), (900, 2), (1200, 2), (1400, 2), (900, 3), (1200, 3), (1400, 3), (900, 4), (1200, 4), (1400, 4);
