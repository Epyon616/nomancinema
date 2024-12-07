import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ConfigContext } from '../../../contexts/ConfigContext';
import {getMovies, getMovieShowTimes } from "../../../apiCallbacks";
import { MovieShowTimeType, MovieType } from "../../../types/types";
import ShowTimeList from "./components/ShowTimeList";
import MovieBookingForm from "./components/MovieBookingForm";
import createBooking from "../../../apiCallbacks/postCallbacks";

import './Movie.css';

const Movie = () => {
  const { id } = useParams();

  const defaultBookingState = {
    firstName: "", 
    lastName: "", 
    movieShowingId: 0, 
    movieId: Number(id) 
  };

  const { configs: { apiHost, apiPort, apiPaths } } = useContext(ConfigContext);
  const [movie, setMovie] = useState<MovieType[]>([]);
  const [movieShowTimes, setMovieShowTimes] = useState<MovieShowTimeType[]>([]);
  const [postResponse, setPostResponse] = useState('');
  const [bookingData, setBookingData] = useState(defaultBookingState);

  const movieApiPath = `${apiHost}:${apiPort}${apiPaths.moviesPath}/${id}`;
  const showTimesApiPath = `${apiHost}:${apiPort}${apiPaths.movieShowingsPath}/${id}`;
  const bookingPostPath = `${apiHost}:${apiPort}${apiPaths.movieBookingPath}`;

  useEffect(() => {
    getMovies(movieApiPath, setMovie);
    getMovieShowTimes(showTimesApiPath, setMovieShowTimes);
  }, [movieApiPath, showTimesApiPath]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevState) => ({ ...prevState, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: bookingData.firstName, 
      lastName: bookingData.lastName, 
      movieShowingId: Number(bookingData.movieShowingId), 
      movieId: Number(id)
    };

    createBooking(bookingPostPath, data, setPostResponse);
  }
    
  const handleBookAgain = (e) => {
    e.preventDefault();
    setPostResponse('');
    setBookingData(defaultBookingState);
  }

  return (
    <>
      <h2>{movie[0].name}</h2>
      <div className="show-times">
        <h3>Show Times:</h3>
        <ul>
          <ShowTimeList showTimes={movieShowTimes} /> 
        </ul>
      </div>
      {!postResponse ? (      
        <MovieBookingForm 
          times={movieShowTimes} 
          booking={bookingData} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
        />
      ) : (
        <>
          <h1 className="booking-confirmed">{postResponse}</h1>
          <button type="button" className="book-again-button" onClick={handleBookAgain}>Book again</button>
        </>
      )}
 
    </>
  )
};

export default Movie;