export type MovieShowTimeType = {
  id: number, 
  movie_id: number,
  time: number
}

export type MovieType = {
  name: string
  id: number
}

export type ShowTimeType = {
  time: number
}

export type bookingDataType = {
  firstName: string, 
  lastName: string, 
  movieId: number, 
  movieShowingId: number
}