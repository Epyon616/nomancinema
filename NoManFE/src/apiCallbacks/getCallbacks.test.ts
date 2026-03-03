import axios from 'axios';
import { getMovies, getMovieShowTimes } from './getCallbacks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getCallbacks', () => {
  describe('getMovies', () => {
    it('should fetch movies and call responseMethod with data', async () => {
      const mockData = [{ id: 1, name: 'Test Movie' }];
      const mockResponse = { data: { data: mockData } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const responseMethod = jest.fn();
      await getMovies('/api/movies', responseMethod);

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/movies');
      expect(responseMethod).toHaveBeenCalledWith(mockData);
    });
  });

  describe('getMovieShowTimes', () => {
    it('should fetch show times and call responseMethod with data', async () => {
      const mockData = [{ id: 1, time: '19:00', movieId: 1 }];
      const mockResponse = { data: { data: mockData } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const responseMethod = jest.fn();
      await getMovieShowTimes('/api/showtimes/1', responseMethod);

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/showtimes/1');
      expect(responseMethod).toHaveBeenCalledWith(mockData);
    });
  });
});
