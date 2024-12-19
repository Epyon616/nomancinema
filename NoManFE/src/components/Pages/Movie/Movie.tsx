import { useEffect, useState, useContext, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { ConfigContext } from '../../../contexts/ConfigContext';
import {getMovies, getMovieShowTimes } from "../../../apiCallbacks";
import { MovieShowTimeType, MovieType } from "../../../types/types";
import ShowTimeList from "./components/ShowTimeList";
import MovieBookingForm from './components/MovieBookingForm';
import BookAgain from './components/BookAgain';
import createBooking from "../../../apiCallbacks/postCallbacks";
import { movieApiPath, showTimesApiPath, bookingPostPath } from "../../helpers/urlHelper";

import './Movie.css';

const Movie = () => {
  const { id } = useParams();
  const ID = Number(id);

  const defaultBookingState = {
    firstName: "", 
    lastName: "", 
    movieShowingId: 0,
    movieId: ID 
  };

  const { configs } = useContext(ConfigContext);
  const [movie, setMovie] = useState<MovieType[]>([]);
  const [movieShowTimes, setMovieShowTimes] = useState<MovieShowTimeType[]>([]);
  const [postResponse, setPostResponse] = useState('');
  const [bookingData, setBookingData] = useState(defaultBookingState);

  useEffect(() => {
    getMovies(movieApiPath(configs, ID), setMovie);
    getMovieShowTimes(showTimesApiPath(configs, ID), setMovieShowTimes);
  }, [configs, ID]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prevState) => ({ ...prevState, [name]: value}));
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const data = {
      firstName: bookingData.firstName, 
      lastName: bookingData.lastName, 
      movieShowingId: Number(bookingData.movieShowingId), 
      movieId: ID
    };

    createBooking(bookingPostPath(configs), data, setPostResponse);
  }
    
  const handleBookAgain = () => {
    setPostResponse('');
    setBookingData(defaultBookingState);
  }
  
  if (movie.length === 0) return <div>Loading...</div>

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
        <BookAgain 
          postResponse={postResponse} 
          handleBookAgain={handleBookAgain} 
        />
      )}
 
    </>
  )
};

export default Movie;