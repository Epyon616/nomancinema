import MovieListItem from '../MovieListItem';
import { MovieType } from '../../../../../types/types';
import { MoviesListType } from './types';

const MoviesList = ({movies}: MoviesListType) => {
  if (movies.length === 0) return (<li>No movies found</li>);

  return (
    <>
      {movies.map((movie:MovieType) => (
        <MovieListItem 
          key={movie.name} 
          name={movie.name} 
          movieId={movie.id} 
        />
      ))}
    </>
  )
}

export default MoviesList;