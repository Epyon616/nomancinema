import { moviesApiPath, movieApiPath, showTimesApiPath, bookingPostPath } from './urlHelper';
import { AppConfig } from '../app/providers/ConfigContext/types';

describe('urlHelper', () => {
  const mockConfigs: AppConfig = {
    apiHost: 'http://localhost',
    apiPort: '3000',
    apiPaths: {
      moviesPath: '/movies',
      movieShowingsPath: '/movies',
      movieBookingPath: '/bookings'
    }
  };

  describe('moviesApiPath', () => {
    it('should return correct path for all movies', () => {
      const result = moviesApiPath(mockConfigs);
      expect(result).toBe('http://localhost:3000/movies');
    });
  });

  describe('movieApiPath', () => {
    it('should return correct path for specific movie', () => {
      const result = movieApiPath(mockConfigs, 123);
      expect(result).toBe('http://localhost:3000/movies/123');
    });
  });

  describe('showTimesApiPath', () => {
    it('should return correct path for show times', () => {
      const result = showTimesApiPath(mockConfigs, 456);
      expect(result).toBe('http://localhost:3000/movies/456');
    });
  });

  describe('bookingPostPath', () => {
    it('should return correct path for bookings', () => {
      const result = bookingPostPath(mockConfigs);
      expect(result).toBe('http://localhost:3000/bookings');
    });
  });
});
