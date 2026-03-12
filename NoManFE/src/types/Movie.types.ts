export type Movie = {
  id: number;
  name: string;
  description: string;
  duration_minutes?: number;
};

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
