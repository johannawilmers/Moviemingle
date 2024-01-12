import { useQuery } from '@apollo/client';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';

import SingleMovie from '../components/singlemovie/SingleMovie';
import { GET_SINGLE_MOVIE } from '../queries/AllMovies';
import { GET_ALL_GENRES } from '../queries/Genres';
import { genre, movie } from '../utils/types';

/**
 * The Single Movie Page component for displaying details of a single movie.
 *
 * @returns {JSX.Element} The rendered SingleMoviePage component.
 */
export const SingleMoviePage = () => {
  const params = useParams();
  const movieID = parseInt(params._id!);
  const userID = localStorage.getItem('userID');

  /**
   * Retrieves the data for a single movie.
   *
   * @type {Object}
   * @property {Object} data - The data for a single movie.
   * @property {boolean} loading - A flag indicating whether the data is loading.
   * @property {Object} error - An error object if there is an issue fetching the data.
   */
  const {
    data: singleMovieData,
    loading: singleMovieLoading,
    error: singleMovieError,
  } = useQuery(GET_SINGLE_MOVIE, {
    variables: { id: movieID, userID: userID },
  });

  /**
   * Retrieves the data for all genres.
   *
   * @type {Object}
   * @property {Object} data - The data for all genres.
   * @property {boolean} loading - A flag indicating whether the data is loading.
   * @property {Object} error - An error object if there is an issue fetching the data.
   */
  const { data: genreData, loading: genreLoading, error: genreError } = useQuery(GET_ALL_GENRES);

  if (singleMovieLoading) return <p>Loading...</p>;
  if (singleMovieError)
    return (
      <div className="errorMessageFavorites">
        <Alert variant="outlined" severity="error">
          Movie does not exist
        </Alert>
      </div>
    );

  const movieData = singleMovieData?.getMovie as movie;
  const genreIds = movieData.genre_ids || [];

  const genresNames: genre[] = genreData?.getAllGenres || [];

  const result: string[] = [];

  if (genreLoading) return <p>Loading this movie's genre</p>;

  if (!genreLoading && !genreError) {
    genresNames.forEach((genre: genre) => {
      if (genreIds && genreIds.includes(genre._id || 0)) {
        result.push(genre.name || '');
      }
    });
  }

  /**
   * Renders the SingleMovie component with details of the selected movie.
   *
   * @returns {JSX.Element} The rendered SingleMovie component.
   */
  return (
    <div>
      <SingleMovie selectedMovie={movieData} genres={result} />
    </div>
  );
};
