import { render, screen, fireEvent } from '@testing-library/react';
import BookingTimes from './BookingTimes';

describe('BookingTimes', () => {
  const mockMutate = jest.fn();
  
  const defaultProps = {
    showings: {
      data: [
        { id: 1, showing_time: '2024-03-15T19:00:00Z', available_seats: 50 },
        { id: 2, showing_time: '2024-03-15T21:00:00Z', available_seats: 30 },
      ],
    },
    booking: {
      isPending: false,
      mutate: mockMutate,
    },
    firstName: 'John',
    lastName: 'Doe',
  };

  beforeEach(() => {
    mockMutate.mockClear();
  });

  it('renders all showtimes', () => {
    render(<BookingTimes {...defaultProps} />);
    expect(screen.getByText('15/03/2024, 19:00:00')).toBeInTheDocument();
    expect(screen.getByText('15/03/2024, 21:00:00')).toBeInTheDocument();
  });

  it('renders book buttons for each showtime', () => {
    render(<BookingTimes {...defaultProps} />);
    const buttons = screen.getAllByRole('button', { name: 'Book' });
    expect(buttons).toHaveLength(2);
  });

  it('disables buttons when booking is pending', () => {
    const props = {
      ...defaultProps,
      booking: { ...defaultProps.booking, isPending: true },
    };
    
    render(<BookingTimes {...props} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('disables buttons when firstName is empty', () => {
    const props = { ...defaultProps, firstName: '' };
    
    render(<BookingTimes {...props} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('disables buttons when lastName is empty', () => {
    const props = { ...defaultProps, lastName: '' };
    
    render(<BookingTimes {...props} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('calls mutate with correct data when book button is clicked', () => {
    render(<BookingTimes {...defaultProps} />);
    const buttons = screen.getAllByRole('button', { name: 'Book' });
    
    fireEvent.click(buttons[0]);
    
    expect(mockMutate).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      movieShowingId: 1,
    });
  });

  it('shows "Booking…" text when booking is pending', () => {
    const props = {
      ...defaultProps,
      booking: { ...defaultProps.booking, isPending: true },
    };
    
    render(<BookingTimes {...props} />);
    expect(screen.getAllByText('Booking…')).toHaveLength(2);
  });
});
