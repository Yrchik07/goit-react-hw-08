import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestMovieDetailsReviews } from '../../services/api';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const reviewsData = await requestMovieDetailsReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        setError('Failed to fetch reviews');
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      {error && <p>{error}</p>}
      {reviews && reviews.results.length > 0 ? (
        <ul>
          {reviews.results.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don&apos;t have any reviews for this movie</p>
      )}
    </div>
  );
};

export default MovieReviews;
