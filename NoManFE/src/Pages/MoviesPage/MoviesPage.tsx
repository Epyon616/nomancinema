import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../api/movies';
import { MoviesList } from '../../components';

const MoviesPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  if (isLoading) return <div>Loading…</div>;

  if (isError) {
    return (
      <div>
        Something went wrong loading movies.
        <pre>{(error as Error).message}</pre>
      </div>
    );
  }

  if (!movies || movies.length === 0) return <div>No movies yet.</div>;

  return (
    <>
      <h2>Movie Listings</h2>
      <>
        <MoviesList movies={movies} /> 
      </>
    </>
  );
} 

export default MoviesPage;