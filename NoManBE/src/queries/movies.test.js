const { getMoviesList, getMovieById } = require('./movies');
const pool = require('../db/pool');

jest.mock('../db/pool');

describe('Movies Queries', () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMoviesList', () => {
    it('should return all movies', () => {
      const mockMovies = [
        { id: 1, name: 'Movie 1' },
        { id: 2, name: 'Movie 2' }
      ];

      pool.query.mockImplementation((query, callback) => {
        callback(null, { rows: mockMovies });
      });

      getMoviesList(mockRequest, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM movies ORDER BY id ASC',
        expect.any(Function)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 200,
        message: 'Movies list retrieved',
        data: mockMovies
      });
    });
  });

  describe('getMovieById', () => {
    it('should return a movie by id', () => {
      const mockMovie = { id: 1, name: 'Test Movie' };
      mockRequest.params = { id: '1' };

      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rows: [mockMovie] });
      });

      getMovieById(mockRequest, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM movies WHERE id = $1',
        [1],
        expect.any(Function)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 200,
        message: 'Movie retrieved',
        data: mockMovie
      });
    });

    it('should return 404 when movie not found', () => {
      mockRequest.params = { id: '999' };

      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rows: [] });
      });

      getMovieById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 404,
        message: 'Movie not found',
        data: null
      });
    });

    it('should return 400 for invalid movie id', () => {
      mockRequest.params = { id: 'invalid' };

      getMovieById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 400,
        message: 'Invalid movie id',
        data: null
      });
    });
  });
});
