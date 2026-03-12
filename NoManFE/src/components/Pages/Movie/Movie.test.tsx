import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Movie from './Movie';
import * as moviesApi from '../../../api/movies';

jest.mock('../../../api/movies');
jest.mock('../../../../lib/api', () => ({
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
        <Routes>
          <Route path="/movie/:id" element={children} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Movie', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/movie/1');
  });

  it('renders loading state', () => {
    jest.spyOn(moviesApi, 'fetchMovieById').mockImplementation(
      () => new Promise(() => {})
    );
    
    render(<Movie />, { wrapper: createWrapper() });
    expect(screen.getByText('Loading movie…')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    jest.spyOn(moviesApi, 'fetchMovieById').mockRejectedValue(
      new Error('Failed to fetch')
    );
    jest.spyOn(moviesApi, 'fetchShowingsByMovieId').mockResolvedValue([]);
    
    render(<Movie />, { wrapper: createWrapper() });
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    });
  });

  it('renders movie details', async () => {
    jest.spyOn(moviesApi, 'fetchMovieById').mockResolvedValue({
      id: 1,
      name: 'Test Movie',
      description: 'Test description',
    });
    jest.spyOn(moviesApi, 'fetchShowingsByMovieId').mockResolvedValue([]);
    
    render(<Movie />, { wrapper: createWrapper() });
    expect(await screen.findByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders no showtimes message', async () => {
    jest.spyOn(moviesApi, 'fetchMovieById').mockResolvedValue({
      id: 1,
      name: 'Test Movie',
      description: 'Test description',
    });
    jest.spyOn(moviesApi, 'fetchShowingsByMovieId').mockResolvedValue([]);
    
    render(<Movie />, { wrapper: createWrapper() });
    expect(await screen.findByText('No showtimes available.')).toBeInTheDocument();
  });
});
