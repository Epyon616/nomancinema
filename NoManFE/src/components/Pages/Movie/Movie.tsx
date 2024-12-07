import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ConfigContext } from '../../../contexts/ConfigContext';
import {getMovies, getMovieShowTimes } from "../../../apiCallbacks";
import { MovieShowTimeType, MovieType } from "../../../types/types";
import ShowTimeList from "./components/ShowTimeList";

import './Movie.css';

const Movie = () => {
  const { id } = useParams();
  const { configs: { apiHost, apiPort, apiPaths } } = useContext(ConfigContext);
  const [movie, setMovie] = useState<MovieType[]>([]);
  const [movieShowTimes, setMovieShowTimes] = useState<MovieShowTimeType[]>([]);
  const movieApiPath = `${apiHost}:${apiPort}${apiPaths.moviesPath}/${id}`;
  const showTimesApiPath = `${apiHost}:${apiPort}${apiPaths.movieShowingsPath}/${id}`;

  useEffect(() => {
    getMovies(movieApiPath, setMovie);
    getMovieShowTimes(showTimesApiPath, setMovieShowTimes);
  },[movieApiPath, showTimesApiPath]);
  
  const movieItem = movie[0];


  return (
    <>
      <h2>{movieItem?.name}</h2>
      <div className="show-times">
        <h3>Show Times:</h3>
        <ul>
          <ShowTimeList showTimes={movieShowTimes} /> 
        </ul>
      </div>
    </>
  )
};

export default Movie;