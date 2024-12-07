import { useState, useEffect, ReactNode, useContext } from 'react';
import { MovieType } from './types';
import MovieListItem from './components/MovieListItem';
import { ConfigContext } from '../../../Contexts/ConfigContext';
import getData from '../../../apiCallbacks';


const Movies = () => {
  const { configs } = useContext(ConfigContext);
  const [movies, setMovies] = useState([]);
  const moviesApiPath = configs.apiHost + ':' + configs.apiPort + configs.apiPaths.moviesPath;

  useEffect(() => {
    getData(moviesApiPath, setMovies)
  }, [moviesApiPath]);

  const displayMovies = () => {
    const moviesList : ReactNode[] = []
    if (movies.length === 0) return (<li>No movies found</li>);

    movies.forEach((movie:MovieType) => {
      moviesList.push(
        <MovieListItem 
          key={movie.name} 
          name={movie.name} 
          movieId={movie.id} 
        />
      )
    });

    return moviesList;
  }

  
  return (
    <>
      <h2>Movie Listings</h2>
      <ul>
        {displayMovies()}
      </ul>
    </>
  );
} 

export default Movies;