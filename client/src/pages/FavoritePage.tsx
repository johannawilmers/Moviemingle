import './favoritePage.css';

import { useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ListView } from '../components/listview/Listview';
import { getFavoritesByUserID } from '../queries/Favorites';
import { movie } from '../utils/types';

/**
 * FavoritePage component for rendering the favorite movies of a user.
 * @module pages/FavoritePage
 */

export const FavoritePage = () => {
  const userID = localStorage.getItem('userID') || '';
  const [movies, setMovies] = useState<movie[]>([]);

  const { loading, error, data } = useQuery(getFavoritesByUserID(), {
    variables: {
      userID: userID,
    },
  });

  /**
   * Render the FavoritePage component.
   * @returns {JSX.Element} FavoritePage component.
   */

  useEffect(() => {
    if (data && !error) {
      setMovies(data.getFavoritesByUserID);
    }
  });

  if (loading) return;
  if (error) return;

  if (movies.length == 0) {
    return (
      <div className="errorMessageFavorites">
        <p> You have no current favorites. You can add your favorites on homepage </p>
        <Button variant="outlined">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p> return to homepage </p>
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <div>
      <div className="listViewFavorite">
        <ListView movies={movies} />
      </div>
    </div>
  );
};
