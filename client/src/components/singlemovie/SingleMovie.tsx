import './singlemovie.css';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

import { movie } from '../../utils/types';
import CommentSection from '../commentsection/CommentSection';
import { HandleFavorite } from '../handleFavorite/HandleFavorite';

/**
 * Props for the SingleMovie component.
 * @typedef {Object} singleMovieProps
 * @property {movie} selectedMovie - The movie object to be displayed.
 * @property {string[]} genres - The genres of the movie.
 */

interface singleMovieProps {
  selectedMovie: movie;
  genres: string[];
}

/**
 * Functional component for rendering details of a movie.
 * @param {singleMovieProps} props - The properties of the component.
 * @returns {JSX.Element} The JSX representation of the SingleMovie component.
 */

const SingleMovie: React.FC<singleMovieProps> = ({ selectedMovie, genres }) => {
  const userID = localStorage.getItem('userID');
  const isScreenSmall = useMediaQuery('(max-width: 1000px)');

  /**
   * Render the SingleMovie component.
   * @returns {JSX.Element} SingleMovie component.
   */

  return (
    <div className="singleMovie">
      <div>
        <Link to="/" className="return-to-movies" tabIndex={0} aria-label="Go back to browse all movies">
          <Button id="returnButton">
            {' '}
            <KeyboardBackspaceIcon />
            ALL MOVIES
          </Button>
        </Link>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w780/${selectedMovie?.backdrop_path}`}
        alt={selectedMovie.title + ' backdrop poster'}
        className="singleMovie-image"
      />

      <div className="card-body">
        <h1 className="card-title" tabIndex={0} aria-label={selectedMovie?.title}>
          {selectedMovie?.title} ({selectedMovie.release_date.split('-')[0]})
        </h1>

        <div tabIndex={0} aria-label="Genres of this movie" className="genres">
          <Stack direction={isScreenSmall ? 'column' : 'row'} spacing={1} className="genreStack">
            {genres.map((name) => (
              <Chip
                tabIndex={0}
                key={name}
                label={name}
                variant="outlined"
                style={{ fontSize: '15px', padding: '10px', color: 'white', margin: '4px' }}
              />
            ))}
          </Stack>
          <div className="circle" aria-label="favorite this movie for later" tabIndex={0}>
            <div id={`singleFavButton-${selectedMovie._id}`} className="favorite-button">
              <HandleFavorite
                userID={userID || ''}
                id={selectedMovie._id || 0}
                isFavorite={selectedMovie.isFavorite || false}
              />
            </div>
          </div>
        </div>

        <div className="average-rating">
          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="text-feedback"
              value={selectedMovie.vote_average}
              readOnly
              precision={0.1}
              max={10}
              aria-label={`Rating: ${selectedMovie.vote_average} stars out of 10 possible stars`}
              tabIndex={0}
            />
            <Box sx={{ ml: 2, fontSize: 25 }}>{selectedMovie?.vote_average}</Box>
          </Box>
        </div>
        <div className="card-overview">
          <hr style={{ height: '1px', margin: '10px 0', border: 'none', backgroundColor: '#ddd' }}></hr>
          <h2 className="section-header" tabIndex={0}>
            Storyline
          </h2>
          <p tabIndex={0}>{selectedMovie?.overview}</p>
        </div>
        <hr style={{ height: '1px', margin: '10px 0', border: 'none', backgroundColor: '#ddd' }}></hr>
        <div className="commentsection">
          <h2 className="section-header" tabIndex={0}>
            Reviews
          </h2>
          <CommentSection movieId={selectedMovie._id || 0} userID={userID || ''} />
        </div>
      </div>
    </div>
  );
};
export default SingleMovie;
