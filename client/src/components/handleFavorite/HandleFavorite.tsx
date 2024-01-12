import { useMutation } from '@apollo/client';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from '@mui/material';
import { MouseEvent, useState } from 'react';

import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../queries/Favorites';

/**
 * HandleFavoriteProps for the HandleFavorite component.
 */
export interface HandleFavoriteProps {
  userID: string;
  id: number;
  isFavorite: boolean;
}

/**
 * Component for handling favorite movies.
 *
 * @param {HandleFavoriteProps} props - The HandleFavoriteProps for the HandleFavorite component.
 * @returns {JSX.Element} The rendered HandleFavorite component.
 */
export const HandleFavorite = ({ userID, id, isFavorite }: HandleFavoriteProps) => {
  const [isFav, setisFav] = useState<boolean>(isFavorite);
  const [removeFavoriteMutation] = useMutation(REMOVE_FAVORITE, {
    variables: { userID: userID, id: id },
  });

  const [addFavoriteMutation] = useMutation(ADD_FAVORITE, {
    variables: { userID: userID, id: id },
  });

  /**
   * Handles the click event for adding or removing a movie from favorites.
   *
   * @param {MouseEvent} event - The click event.
   */
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (isFav) {
      removeFavoriteMutation();
      const isFavoritesPage = window.location.href.includes('/favorites');
      if (isFavoritesPage) {
        window.location.reload();
      }
    } else {
      addFavoriteMutation();
    }
    setisFav(!isFav);
  };

  return (
    <div>
      <Button
        aria-label={isFav ? 'Remove movie from favorites' : 'Add movie to favorites'}
        id="favButton"
        onClick={handleClick}
        style={{ cursor: 'pointer', zIndex: 10, position: 'relative' }}
      >
        {isFav ? <FavoriteIcon style={{ fontSize: '44px' }} /> : <FavoriteBorderIcon style={{ fontSize: '44px' }} />}
      </Button>
    </div>
  );
};
