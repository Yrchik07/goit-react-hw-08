import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { requestMoviesByTrending } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const data = await requestMoviesByTrending();
        setResults(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsError(false);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div>
      <h1>Trending today</h1>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      <MovieList results={results} />
    </div>
  );
};

export default HomePage;
