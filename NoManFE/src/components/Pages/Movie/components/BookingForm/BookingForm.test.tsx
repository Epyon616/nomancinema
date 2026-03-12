import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BookingForm from './BookingForm';
import * as moviesApi from '../../../../../api/movies';

jest.mock('../../../../../api/movies');
jest.mock('../../../../../../lib/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('BookingForm', () => {
  const mockShowingsQuery = {
    data: [
      { id: 1, showing_time: '2024-03-15T19:00:00Z', available_seats: 50 },
    ],
    isLoading: false,
    isError: false,
  };

  it('renders booking form when showings are available', () => {
    render(
      <BookingForm showingsQuery={mockShowingsQuery} movieId={1} />,
      { wrapper: createWrapper() }
    );
    
    expect(screen.getByText('Book now')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
  });

  it('does not render form when no showings available', () => {
    const emptyQuery = { ...mockShowingsQuery, data: [] };
    
    render(
      <BookingForm showingsQuery={emptyQuery} movieId={1} />,
      { wrapper: createWrapper() }
    );
    
    expect(screen.queryByPlaceholderText('First name')).not.toBeInTheDocument();
  });

  it('updates firstName input', () => {
    render(
      <BookingForm showingsQuery={mockShowingsQuery} movieId={1} />,
      { wrapper: createWrapper() }
    );
    
    const input = screen.getByPlaceholderText('First name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John' } });
    
    expect(input.value).toBe('John');
  });

  it('updates lastName input', () => {
    render(
      <BookingForm showingsQuery={mockShowingsQuery} movieId={1} />,
      { wrapper: createWrapper() }
    );
    
    const input = screen.getByPlaceholderText('Last name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Doe' } });
    
    expect(input.value).toBe('Doe');
  });

  it('shows success message after successful booking', async () => {
    jest.spyOn(moviesApi, 'createBooking').mockResolvedValue({ bookingId: 123 });
    
    render(
      <BookingForm showingsQuery={mockShowingsQuery} movieId={1} />,
      { wrapper: createWrapper() }
    );
    
    fireEvent.change(screen.getByPlaceholderText('First name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last name'), {
      target: { value: 'Doe' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Book' }));
    
    await waitFor(() => {
      expect(screen.getByText('Booking confirmed ✅')).toBeInTheDocument();
    });
  });

  it('shows error message after failed booking', async () => {
    jest.spyOn(moviesApi, 'createBooking').mockRejectedValue(
      new Error('Booking failed')
    );
    
    render(
      <BookingForm showingsQuery={mockShowingsQuery} movieId={1} />,
      { wrapper: createWrapper() }
    );
    
    fireEvent.change(screen.getByPlaceholderText('First name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last name'), {
      target: { value: 'Doe' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Book' }));
    
    await waitFor(() => {
      expect(screen.getByText('Booking failed:', { exact: false })).toBeInTheDocument();
    });
  });
});
