import './listview.css';

import { movie } from '../../utils/types';
import { MovieCard } from '../movieCard/movieCard';
interface props {
  movies: movie[];
}
export const ListView = ({ movies }: props) => {
  const userID = localStorage.getItem('userID');

  if (movies.length === 0) {
    return <p id="errorMessageSearch"> There are no movies matching this search </p>;
  }

  return (
    <div className="listview-container">
      {movies.map((movie: movie) => (
        <MovieCard key={movie._id} movie={movie} userID={userID || ''} />
      ))}
    </div>
  );
};
export default ListView;
