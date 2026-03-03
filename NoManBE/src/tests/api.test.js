const request = require('supertest');
const app = require('../server');

// Mock the database pool
jest.mock('../db/pool', () => ({
  query: jest.fn(),
  end: jest.fn()
}));

const pool = require('../db/pool');

describe('Movies API Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/movies', () => {
    it('should return a 200 response with movies', async () => {
      const mockMovies = [
        { id: 1, name: 'Test Movie 1' },
        { id: 2, name: 'Test Movie 2' }
      ];

      pool.query.mockImplementation((query, callback) => {
        callback(null, { rows: mockMovies });
      });

      const response = await request(app).get('/api/movies');
      
      expect(response.status).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.data).toEqual(mockMovies);
    });
  });

  describe('GET /api/movies/:id', () => {
    it('should return a specific movie', async () => {
      const mockMovie = { id: 1, name: 'Test Movie' };

      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rows: [mockMovie] });
      });

      const response = await request(app).get('/api/movies/1');
      
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockMovie);
    });
  });

  describe('POST /api/movie-booking', () => {
    it('should create a booking successfully', async () => {
      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rows: [{ id: 456 }] });
      });

      const response = await request(app)
        .post('/api/movie-booking')
        .send({
          firstName: 'Jane',
          lastName: 'Smith',
          movieShowingId: 2
        });
      
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Booking confirmed');
      expect(response.body.data.bookingId).toBe(456);
    });
  });
});

// NOTE: These tests now use mocked database connections instead of requiring a real database.
// In a production environment, you would also want integration tests with a test database
// using an ORM that facilitates separate dev and test environments with migration scripts.
