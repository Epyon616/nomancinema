import { api } from "../../lib/api";
import { ApiResponse, CreateBookingInput, Movie, MovieShowing } from "../types/types";

export async function fetchMovies() {
  const res = await api.get<ApiResponse<Movie[]>>("/api/movies");
  return res.data.data;
}

export async function fetchMovieById(id: number) {
  const res = await api.get<ApiResponse<Movie>>(`/api/movies/${id}`);
  return res.data.data;
}

export async function fetchShowingsByMovieId(id: number) {
  const res = await api.get<ApiResponse<MovieShowing[]>>(`/api/movie-showings/${id}`);
  return res.data.data;
}

const BOOKINGS_PATH = "/api/movie-booking";

export async function createBooking(input: CreateBookingInput) {
  const res = await api.post<ApiResponse<{ bookingId: number }>>(BOOKINGS_PATH, input);
  return res.data.data;
}