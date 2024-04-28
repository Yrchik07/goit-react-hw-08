import { NavLink, useLocation } from 'react-router-dom';

const MovieList = ({ results }) => {
  const location = useLocation();
  return (
    <ul>
      {Array.isArray(results) &&
        results.map(result => {
          return (
            <li key={result.id}>
              <NavLink state={location} to={`/movies/${result.id}`}>
                {result.title}
              </NavLink>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
