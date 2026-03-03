
INSERT INTO movies (name, description, duration_minutes)
VALUES
('Interstellar', 'A team travels through a wormhole in space.', 169),
('The Dark Knight', 'Batman faces the Joker.', 152),
('Spirited Away', 'A girl enters a mysterious spirit world.', 125);
INSERT INTO movie_showings (movie_id, showing_time)
VALUES
(1, NOW() + INTERVAL '1 day'),
(1, NOW() + INTERVAL '2 days'),
(2, NOW() + INTERVAL '1 day'),
(3, NOW() + INTERVAL '3 days');
INSERT INTO movie_bookings (first_name, last_name, movie_id, movie_showing_id)
VALUES
('John', 'Smith', 1, 1),
('Sarah', 'Connor', 2, 3);
