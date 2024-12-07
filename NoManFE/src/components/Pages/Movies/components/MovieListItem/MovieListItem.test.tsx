import { BrowserRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import MovieListItem from "./MovieListItem";

describe('MovieListItem', () => {
  it('renders the component correctly', () => {
    render(
      <BrowserRouter>
        <MovieListItem name="James Pond" movieId={1234} />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('link')).toHaveAttribute('href', '/movie/1234');
  });
});