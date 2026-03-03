import { render, screen, fireEvent } from '@testing-library/react';
import MovieBookingForm from './MovieBookingForm';

describe('MovieBookingForm', () => {
  const mockTimes = [
    { id: 1, time: 1900, movie_id: 1 },
    { id: 2, time: 2100, movie_id: 1 }
  ];

  const mockBooking = {
    firstName: '',
    lastName: '',
    movieShowingId: 1,
    movieId: 1
  };

  let handleChange: jest.Mock;
  let handleSubmit: jest.Mock;

  beforeEach(() => {
    handleChange = jest.fn();
    handleSubmit = jest.fn((e) => e.preventDefault());
    // Suppress console errors for this test suite
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render form fields correctly', () => {
    render(
      <MovieBookingForm
        times={mockTimes}
        booking={mockBooking}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );

    expect(screen.getByText(/first name/i)).toBeInTheDocument();
    expect(screen.getByText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText(/select showing/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument();
  });

  it('should render show times in select dropdown', () => {
    render(
      <MovieBookingForm
        times={mockTimes}
        booking={mockBooking}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );

    expect(screen.getByText('1900')).toBeInTheDocument();
    expect(screen.getByText('2100')).toBeInTheDocument();
  });

  it('should call handleChange when input values change', () => {
    render(
      <MovieBookingForm
        times={mockTimes}
        booking={mockBooking}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { name: 'firstName', value: 'John' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('should call handleSubmit when button is clicked', () => {
    render(
      <MovieBookingForm
        times={mockTimes}
        booking={mockBooking}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: /book now/i });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
