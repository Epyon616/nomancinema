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

  if (movies.length === 0) return <div>Loading...</div>

  return (
    <>
      <h2>Movie Listings</h2>
      <>
        <MoviesList movies={movies} /> 
      </>
    </>
  );
} 

export default Movies;