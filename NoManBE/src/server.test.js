const request = require('supertest');
const app = require('./server');

// Mock the database pool
jest.mock('./db/pool', () => ({
  query: jest.fn(),
  end: jest.fn()
}));

const pool = require('./db/pool');

describe('Server API Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/api');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        info: 'Welcome to the No Man Cinema API'
      });
    });
  });

  describe('GET /api/movies', () => {
    it('should return movies list', async () => {
      const mockMovies = [
        { id: 1, name: 'Movie 1' },
        { id: 2, name: 'Movie 2' }
      ];

      pool.query.mockImplementation((query, callback) => {
        callback(null, { rows: mockMovies });
      });

      const response = await request(app).get('/api/movies');
      
      expect(response.status).toBe(200);
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

    it('should return 400 for invalid id', async () => {
      const response = await request(app).get('/api/movies/invalid');
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid movie id');
    });
  });

  describe('GET /api/movie-showings/:id', () => {
    it('should return showings for a movie', async () => {
      const mockShowings = [
        { id: 1, movie_id: 1, time: 1900 },
        { id: 2, movie_id: 1, time: 2100 }
      ];

      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rows: mockShowings });
      });

      const response = await request(app).get('/api/movie-showings/1');
      
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockShowings);
    });
  });

  describe('POST /api/movie-booking', () => {
    it('should create a booking', async () => {
      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rows: [{ id: 123 }] });
      });

      const response = await request(app)
        .post('/api/movie-booking')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          movieShowingId: 1
        });
      
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Booking confirmed');
      expect(response.body.data.bookingId).toBe(123);
    });

    it('should return 400 for missing fields', async () => {
      const response = await request(app)
        .post('/api/movie-booking')
        .send({
          firstName: 'John'
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing required fields');
    });
  });

  describe('CORS', () => {
    it('should have CORS enabled', async () => {
      const response = await request(app)
        .options('/api/movies')
        .set('Origin', 'http://localhost:3000');
      
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });
});
