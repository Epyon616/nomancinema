import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BookingForm from './BookingForm';
import * as moviesApi from '../../../../../api/movies';

jest.mock('../../../../../api/movies');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('BookingForm', () => {
  const mockShowings = [
    { id: 1, movie_id: 1, showing_time: '2024-03-15T19:00:00Z' },
    { id: 2, movie_id: 1, showing_time: '2024-03-15T21:00:00Z' }
  ];

  const mockShowingsQuery = {
    data: mockShowings,
    isLoading: false,
    isError: false,
    error: null
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render booking form with showings', () => {
    render(
      <BookingForm showingsQuery={mockShowingsQuery as any} movieId={1} />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText('Book now')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
  });

  it('should render showing times with book buttons', () => {
    render(
      <BookingForm showingsQuery={mockShowingsQuery as any} movieId={1} />,
      { wrapper: createWrapper() }
    );

    const bookButtons = screen.getAllByRole('button', { name: /book/i });
    expect(bookButtons).toHaveLength(2);
  });

  it('should disable book buttons when names are empty', () => {
    render(
      <BookingForm showingsQuery={mockShowingsQuery as any} movieId={1} />,
      { wrapper: createWrapper() }
    );

    const bookButtons = screen.getAllByRole('button', { name: /book/i });
    bookButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('should enable book buttons when names are filled', () => {
    render(
      <BookingForm showingsQuery={mockShowingsQuery as any} movieId={1} />,
      { wrapper: createWrapper() }
    );

    const firstNameInput = screen.getByPlaceholderText('First name');
    const lastNameInput = screen.getByPlaceholderText('Last name');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    const bookButtons = screen.getAllByRole('button', { name: /book/i });
    bookButtons.forEach(button => {
      expect(button).not.toBeDisabled();
    });
  });

  it('should call createBooking mutation when book button is clicked', async () => {
    const mockCreateBooking = jest.fn().mockResolvedValue({});
    (moviesApi.createBooking as jest.Mock) = mockCreateBooking;

    render(
      <BookingForm showingsQuery={mockShowingsQuery as any} movieId={1} />,
      { wrapper: createWrapper() }
    );

    const firstNameInput = screen.getByPlaceholderText('First name');
    const lastNameInput = screen.getByPlaceholderText('Last name');

    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });

    const bookButtons = screen.getAllByRole('button', { name: /book/i });
    fireEvent.click(bookButtons[0]);

    await waitFor(() => {
      expect(mockCreateBooking).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Smith',
        movieShowingId: 1
      });
    });
  });

  it('should not render form when no showings available', () => {
    const emptyShowingsQuery = {
      data: [],
      isLoading: false,
      isError: false,
      error: null
    };

    render(
      <BookingForm showingsQuery={emptyShowingsQuery as any} movieId={1} />,
      { wrapper: createWrapper() }
    );

    expect(screen.queryByPlaceholderText('First name')).not.toBeInTheDocument();
  });
});
