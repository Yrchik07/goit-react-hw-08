import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestMovieDetailsCast } from '../../services/api';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetailsCast = await requestMovieDetailsCast(movieId);
        setMovieDetails(movieDetailsCast);
      } catch (error) {
        console.error('Failed to get a movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);
  return (
    <ul>
      {movieDetails !== null &&
        movieDetails.cast.map(actor => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              width="100"
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
    </ul>
  );
};

export default MovieCast;
