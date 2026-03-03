const { getMovieShowingsByMovieId } = require('./movieShowings');
const pool = require('../db/pool');

jest.mock('../db/pool');

describe('Movie Showings Queries', () => {
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

  describe('getMovieShowingsByMovieId', () => {
    it('should return showings for a movie', () => {
      const mockShowings = [
        { id: 1, movie_id: 1, time: 1900 },
        { id: 2, movie_id: 1, time: 2100 }
      ];
      mockRequest.params = { id: '1' };

      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rows: mockShowings });
      });

      getMovieShowingsByMovieId(mockRequest, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM movie_showings WHERE movie_id = $1 ORDER BY id ASC',
        [1],
        expect.any(Function)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 200,
        message: 'Showings retrieved',
        data: mockShowings
      });
    });

    it('should return 404 when no showings found', () => {
      mockRequest.params = { id: '999' };

      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rows: [] });
      });

      getMovieShowingsByMovieId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 404,
        message: 'No showings found for movie',
        data: []
      });
    });

    it('should return 400 for invalid movie id', () => {
      mockRequest.params = { id: 'invalid' };

      getMovieShowingsByMovieId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 400,
        message: 'Invalid movie id',
        data: null
      });
    });
  });
});
