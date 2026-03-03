const { createMovieBooking } = require('./movieBookings');
const pool = require('../db/pool');

jest.mock('../db/pool');

describe('Movie Bookings Queries', () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMovieBooking', () => {
    it('should create a booking successfully', () => {
      mockRequest.body = {
        firstName: 'John',
        lastName: 'Doe',
        movieShowingId: 1
      };

      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rows: [{ id: 123 }] });
      });

      createMovieBooking(mockRequest, mockResponse, mockNext);

      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO movie_bookings'),
        ['John', 'Doe', 1],
        expect.any(Function)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 201,
        message: 'Booking confirmed',
        data: { bookingId: 123 }
      });
    });

    it('should return 400 when firstName is missing', () => {
      mockRequest.body = {
        lastName: 'Doe',
        movieShowingId: 1
      };

      createMovieBooking(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 400,
        message: 'Missing required fields',
        data: null
      });
    });

    it('should return 400 when lastName is missing', () => {
      mockRequest.body = {
        firstName: 'John',
        movieShowingId: 1
      };

      createMovieBooking(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 400,
        message: 'Missing required fields',
        data: null
      });
    });

    it('should return 400 when movieShowingId is missing', () => {
      mockRequest.body = {
        firstName: 'John',
        lastName: 'Doe'
      };

      createMovieBooking(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 400,
        message: 'Missing required fields',
        data: null
      });
    });

    it('should return 400 for invalid movieShowingId', () => {
      mockRequest.body = {
        firstName: 'John',
        lastName: 'Doe',
        movieShowingId: 'invalid'
      };

      createMovieBooking(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        code: 400,
        message: 'Invalid movieShowingId',
        data: null
      });
    });

    it('should call next with error on database error', () => {
      mockRequest.body = {
        firstName: 'John',
        lastName: 'Doe',
        movieShowingId: 1
      };

      const dbError = new Error('Database error');
      pool.query.mockImplementation((query, params, callback) => {
        callback(dbError, null);
      });

      createMovieBooking(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(dbError);
    });
  });
});
