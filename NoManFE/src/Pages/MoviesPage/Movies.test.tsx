import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import MoviesPage from './MoviesPage';
import * as moviesApi from '../../api/movies';

jest.mock('../../api/movies');
jest.mock('../../../lib/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Movies', () => {
  it('renders loading state', () => {
    jest.spyOn(moviesApi, 'fetchMovies').mockImplementation(
      () => new Promise(() => {})
    );
    
    render(<MoviesPage />, { wrapper: createWrapper() });
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    jest.spyOn(moviesApi, 'fetchMovies').mockRejectedValue(
      new Error('Failed to fetch')
    );
    
    render(<MoviesPage />, { wrapper: createWrapper() });
    expect(await screen.findByText(/Something went wrong loading movies/)).toBeInTheDocument();
  });

  it('renders empty state', async () => {
    jest.spyOn(moviesApi, 'fetchMovies').mockResolvedValue([]);
    
    render(<MoviesPage />, { wrapper: createWrapper() });
    expect(await screen.findByText('No movies yet.')).toBeInTheDocument();
  });

  it('renders movies list', async () => {
    jest.spyOn(moviesApi, 'fetchMovies').mockResolvedValue([
      { id: 1, name: 'Test Movie', description: 'Test description' },
    ]);
    
    render(<MoviesPage />, { wrapper: createWrapper() });
    expect(await screen.findByText('Movie Listings')).toBeInTheDocument();
  });
});
