import { useState, useEffect, useContext } from 'react';
import { MovieType } from '../../../types/types';
import { ConfigContext } from '../../../contexts/ConfigContext';
import MoviesList from './components/MoviesList';
import {getMovies} from '../../../apiCallbacks';
import { moviesApiPath } from '../../helpers/urlHelper';

const Movies = () => {
  const { configs } = useContext(ConfigContext);
  const [movies, setMovies] = useState<MovieType[]>([]);
 

  useEffect(() => {
    getMovies(moviesApiPath(configs), setMovies)
  }, [configs]);

  return (
    <>
      <h2>Movie Listings</h2>
      <ul>
        <MoviesList movies={movies} /> 
      </ul>
    </>
  );
} 

export default Movies;