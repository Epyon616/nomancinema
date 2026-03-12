import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MoviesList from './MoviesList';

describe('MoviesList', () => {
  describe('When an empty array is passed', () => {
    it('should render a message', () => {
      render(<MoviesList movies={[]} />);
      expect(screen.getByText('No movies found')).toBeInTheDocument();
    });
  });

  describe('When an array of movies is passed', () => {
    const movies= [
      { id: 1, name: 'test' },
      { id: 2, name: 'test 2 - the return of the test' }
    ]

    it('should render the items', () => {
      render(
        <BrowserRouter>
          <MoviesList movies={movies} />
        </BrowserRouter>
      );

      expect(screen.queryByText('No movies found')).not.toBeInTheDocument();
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('test 2 - the return of the test')).toBeInTheDocument();
    });
  });
});
