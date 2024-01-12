import './movieCard.css';

import StarIcon from '@mui/icons-material/Star';
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { movie } from '../../utils/types';
import { HandleFavorite } from '../handleFavorite/HandleFavorite';

/**
 * Props for the MovieCard component.
 * @typedef {Object} MovieCardProps
 * @property {movie} movie - The movie object to be displayed.
 * @property {string} userID - The user ID.
 */
interface movieCardProps {
  movie: movie;
  userID: string;
}

/**
 * Functional component for rendering details of a movie.
 * @param {MovieCardProps} props - The properties of the component.
 * @returns {JSX.Element} The JSX representation of the MovieCard component.
 */
export const MovieCard: FC<movieCardProps> = ({ movie, userID }) => {
  /**
   * Render the MovieCard component.
   * @returns {JSX.Element} MovieCard component.
   */
  return (
    <div className="movie-container">
      <Link className="link" to={`/movie/${movie._id}`} id={`movieImage-${movie._id}`}>
        <Card className="movie-card" key={movie._id}>
          <img id="movieCardImage" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
          <CardContent>
            <Typography gutterBottom component="div">
              <p>{movie.title}</p>
            </Typography>
            <div className="rating">
              <StarIcon style={{ fontSize: '32px' }}></StarIcon>
              <p>{movie.vote_average} / 10</p>
            </div>
          </CardContent>
        </Card>
      </Link>
      <div id={`favButton-${movie._id}`} className="heartSection">
        <HandleFavorite userID={userID} id={movie._id || 0} isFavorite={movie.isFavorite || false} />
      </div>
    </div>
  );
};
