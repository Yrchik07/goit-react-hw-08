import {Suspense, useEffect, useRef, useState } from 'react';
import {
  Outlet,
  Link,
  NavLink,
  useParams,
  useLocation,
} from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { requestMovieDetailsById } from '../../services/api';
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetailsData = await requestMovieDetailsById(movieId);

        setMovieDetails(movieDetailsData);
      } catch (error) {
        console.error('Failed to get a movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      {movieDetails !== null && (
        <div>
          <Link to={backLinkRef.current}>⬅ Go back</Link>
          <section className={css.movieDetails}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
            <ul>
              <li>
                <h2>
                  {movieDetails.title} ({movieDetails.release_date})
                </h2>
                <p>User score: {movieDetails.vote_average}</p>
              </li>
              <li>
                <h3>Overview </h3>
                <p>{movieDetails.overview}</p>
              </li>
              <li>
                <h3>Genres</h3>
                <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
              </li>
            </ul>
          </section>
          <section>
            <h3>Additional information</h3>
            <ul>
              <li>
                <NavLink to="cast"
                 state={{ url: `movie/${movieId}/credits` }}
                 >
                  Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews" state={{ url: `movie/${movieId}/reviews` }}>
                  Reviews</NavLink>
              </li>
            </ul>
          </section>
          <Suspense fallback={<Loader />}>
             <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
