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

export type MovieShowing = {
  id: number;
  movie_id: number;
  showing_time: string;
};

export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type CreateBookingInput = {
  firstName: string;
  lastName: string;
  movieShowingId: number;
};
