const request = require('supertest');
const app = require('../server');
const pool = require('../db/pool');

jest.mock('../db/pool');

describe('API Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Complete booking flow', () => {
    it('should get movies, get showings, and create booking', async () => {
      // Step 1: Get movies list
      const mockMovies = [
        { id: 1, name: 'The Matrix' },
        { id: 2, name: 'Inception' }
      ];

      pool.query.mockImplementationOnce((query, callback) => {
        callback(null, { rows: mockMovies });
      });

      const moviesResponse = await request(app).get('/api/movies');
      expect(moviesResponse.status).toBe(200);
      expect(moviesResponse.body.data).toEqual(mockMovies);

      // Step 2: Get showings for a movie
      const mockShowings = [
        { id: 1, movie_id: 1, time: 1900 },
        { id: 2, movie_id: 1, time: 2100 }
      ];

      pool.query.mockImplementationOnce((query, params, callback) => {
        callback(null, { rows: mockShowings });
      });

      const showingsResponse = await request(app).get('/api/movie-showings/1');
      expect(showingsResponse.status).toBe(200);
      expect(showingsResponse.body.data).toEqual(mockShowings);

      // Step 3: Create a booking
      pool.query.mockImplementationOnce((query, params, callback) => {
        callback(null, { rows: [{ id: 789 }] });
      });

      const bookingResponse = await request(app)
        .post('/api/movie-booking')
        .send({
          firstName: 'Alice',
          lastName: 'Johnson',
          movieShowingId: 1
        });

      expect(bookingResponse.status).toBe(201);
      expect(bookingResponse.body.data.bookingId).toBe(789);
    });
  });

  describe('Error handling', () => {
    it('should handle invalid routes', async () => {
      const response = await request(app).get('/api/invalid-route');
      expect(response.status).toBe(404);
    });

    it('should handle invalid movie ID format', async () => {
      const response = await request(app).get('/api/movies/abc');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid movie id');
    });

    it('should handle missing booking fields', async () => {
      const response = await request(app)
        .post('/api/movie-booking')
        .send({
          firstName: 'Bob'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing required fields');
    });
  });

  describe('API response format', () => {
    it('should return consistent response format for success', async () => {
      pool.query.mockImplementation((query, callback) => {
        callback(null, { rows: [] });
      });

      const response = await request(app).get('/api/movies');
      
      expect(response.body).toHaveProperty('code');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
    });

    it('should return consistent response format for errors', async () => {
      const response = await request(app).get('/api/movies/invalid');
      
      expect(response.body).toHaveProperty('code');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toBe(null);
    });
  });
});
