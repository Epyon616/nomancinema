import MovieListItem from '../MovieListItem';
import { Movie } from '../../types';
import { MoviesListType } from './MovieList.types';

import './styles.css';

const MoviesList = ({movies}: MoviesListType) => {
  if (movies.length === 0) return (<li>No movies found</li>);

  return (
    <div className="movies">
      {movies.map((movie:Movie) => (
        <MovieListItem 
          key={movie.name} 
          name={movie.name} 
          movieId={movie.id} 
        />
      ))}
    </div>
  )
}

export default MoviesList;