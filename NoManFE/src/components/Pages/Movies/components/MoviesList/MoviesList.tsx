import MovieListItem from '../MovieListItem';
import { MovieType } from '../../../../../types/types';
import { MoviesListType } from './types';

import './styles.css';

const MoviesList = ({movies}: MoviesListType) => {
  if (movies.length === 0) return (<li>No movies found</li>);

  return (
    <div className="movies">
      {movies.map((movie:MovieType) => (
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