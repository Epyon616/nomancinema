export type ShowTimeType = {
  showing_time: string;
  id: number;
}

export type bookingDataType = {
  firstName: string, 
  lastName: string, 
  movieShowingId: number
}

export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type Movie = {
  id: number;
  name: string;
  description: string;
  duration_minutes?: number;
};

// Alias for backward compatibility
export type MovieType = Movie;

export type MovieShowing = {
  id: number;
  movie_id: number;
  showing_time: string;
};

// Alias for backward compatibility
export type MovieShowTimeType = MovieShowing;

export type CreateBookingInput = {
  firstName: string;
  lastName: string;
  movieShowingId: number;
};
