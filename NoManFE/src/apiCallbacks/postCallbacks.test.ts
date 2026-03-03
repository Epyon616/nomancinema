import axios from 'axios';
import createBooking from './postCallbacks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('postCallbacks', () => {
  describe('createBooking', () => {
    it('should post booking data and call responseMethod on success', async () => {
      const mockResponse = { data: 'Booking confirmed' };
      mockedAxios.post.mockResolvedValue(mockResponse);

      const bookingData = {
        firstName: 'John',
        lastName: 'Doe',
        movieShowingId: 1,
        movieId: 1
      };
      const responseMethod = jest.fn();

      await createBooking('/api/bookings', bookingData, responseMethod);

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/bookings', bookingData);
      expect(responseMethod).toHaveBeenCalledWith('Booking confirmed');
    });

    it('should handle errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockError = new Error('Network error');
      mockedAxios.post.mockRejectedValue(mockError);

      const bookingData = {
        firstName: 'John',
        lastName: 'Doe',
        movieShowingId: 1,
        movieId: 1
      };
      const responseMethod = jest.fn();

      await createBooking('/api/bookings', bookingData, responseMethod);

      expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
      expect(responseMethod).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });
});
