import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import css from './MoviesPage.module.css';
import { requestMoviesBySearch } from '../../services/api';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isError, setIsError] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    const fetchMoviesByQuery = async () => {
      if (!query) return;
      try {
        setIsLoading(true);
        const data = await requestMoviesBySearch(query);

        if (data.results.length === 0) {
          setResults([]);
        } else {
          setResults(data.results);
        }
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesByQuery();
  }, [query]);

  const onSubmit = event => {
    event.preventDefault();
    setSearchParams({ query: searchTerm });
  };

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <header className={css.header}>
        <form onSubmit={onSubmit} className={css.form}>
          <button className={css.submitBtn} type="submit" aria-label="Search">
            🔍
          </button>
          <input
            className={css.field}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
        <Toaster position="top-left" aria-label="Search" />
      </header>
      {isLoading && <Loader />}

      <div>
        {isError && <ErrorMessage />}
        <MovieList results={results} />
      </div>
    </>
  );
};

export default MoviesPage;
