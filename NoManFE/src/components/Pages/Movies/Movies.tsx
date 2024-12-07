import { useState, useEffect, useContext } from 'react';
import { MovieType } from '../../../types/types';

import { ConfigContext } from '../../../contexts/ConfigContext';
import MoviesList from './components/MoviesList';
import {getMovies} from '../../../apiCallbacks';


const Movies = () => {
  const { configs: { apiHost, apiPort, apiPaths } } = useContext(ConfigContext);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const moviesApiPath = `${apiHost}:${apiPort}${apiPaths.moviesPath}`;

  useEffect(() => {
    getMovies(moviesApiPath, setMovies)
  }, [moviesApiPath]);

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