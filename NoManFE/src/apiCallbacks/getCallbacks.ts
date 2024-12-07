import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { MovieType, MovieShowTimeType } from '../types/types';


const getMovies = async (path:string, responseMethod: Dispatch<SetStateAction<MovieType[]>>) => {
  await axios.get(path).then(
    (response) => {
      responseMethod(response.data.data)
    }
  )
} 

const getMovieShowTimes = async (path:string, responseMethod: Dispatch<SetStateAction<MovieShowTimeType[]>>) => {
  await axios.get(path).then(
    (response) => {
      responseMethod(response.data.data)
    }
  )
} 

export { getMovies, getMovieShowTimes };