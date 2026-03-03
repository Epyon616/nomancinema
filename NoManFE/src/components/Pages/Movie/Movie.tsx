import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ShowTimeList } from './components';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieById, fetchShowingsByMovieId } from '../../../api/movies';

import './Movie.css';
import BookingForm from './components/BookingForm';


function parseId(raw: string | undefined) {
  const n = Number(raw);
  return Number.isInteger(n) ? n : null;
}

const Movie = () => {
  const params = useParams();
  const movieId = useMemo(() => parseId(params.id), [params.id]);

  const movieQuery = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieById(movieId as number),
    enabled: movieId !== null,
  });

  const showingsQuery = useQuery({
    queryKey: ["showings", movieId],
    queryFn: () => fetchShowingsByMovieId(movieId as number),
    enabled: movieId !== null,
  });

  if (movieId === null) return <div>Invalid movie id.</div>;
  if (movieQuery.isLoading) return <div>Loading movie…</div>;
  if (movieQuery.isError)
    return (
      <div>
        Couldn’t load movie.
        <pre>{(movieQuery.error as Error).message}</pre>
      </div>
    );

  const movie = movieQuery.data;
  if (movie === undefined) return <p>please hold on</p>

  return (
    <>
      <h2>{movie.name}</h2>
      <p>{movie.description}</p>
      <div className="show-times">
        <h3>Show Times:</h3>
        { showingsQuery.isLoading && <div>Loading showtimes... </div>}
        { showingsQuery.isError && (
          <div> 
            Couldn't load show times. 
            <pre>{(showingsQuery.error as Error).message}</pre>
          </div>
        )}
        {showingsQuery.data && showingsQuery.data.length === 0 && (
          <div>No showtimes available.</div>
        )}
        {showingsQuery.data && showingsQuery.data.length > 0 && (
          <>
            <ul>
              <ShowTimeList showTimes={showingsQuery.data} />
            </ul>
            <BookingForm showingsQuery={showingsQuery} movieId={movieId} />
          </>
        )}  
      </div> 
    </>
  )
};

export default Movie;
