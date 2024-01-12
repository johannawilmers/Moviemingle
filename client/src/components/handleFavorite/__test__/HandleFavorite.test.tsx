import '@testing-library/jest-dom';

import { fireEvent, screen, waitFor } from '@testing-library/react';

import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../../queries/Favorites';
import { renderWithMocks } from '../../../utils/testUtils';
import { HandleFavorite } from '../HandleFavorite';

const mocks = [
  {
    request: {
      query: ADD_FAVORITE,
      variables: { userID: 'testUser', id: 385687 },
    },
    result: {
      data: {
        addFavorite: {
          _id: 385687,
          userID: 'testUser',
        },
      },
    },
  },
  {
    request: {
      query: REMOVE_FAVORITE,
      variables: { userID: 'testUser', id: 385687 },
    },
    result: {
      data: {
        removeFavorite: {
          _id: 385687,
          userID: 'testUser',
        },
      },
    },
  },
];

describe('HandleFavorite', () => {
  it('renders with favorite false', () => {
    const { container } = renderWithMocks(<HandleFavorite userID={'testUser'} id={385687} isFavorite={false} />, mocks);
    expect(container).toMatchSnapshot();
  });

  it('render when user favorite a movie', async () => {
    renderWithMocks(<HandleFavorite userID="testUser" id={385687} isFavorite={false} />, mocks);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole('button').querySelector('.FavoriteBorderIcon')).toBeDefined();
      fireEvent.click(button);
    });
    await waitFor(() => {});
    expect(screen.getByRole('button').querySelector('.FavoriteIcon')).toBeDefined();
  });

  it('render when user removes favorite ', async () => {
    renderWithMocks(<HandleFavorite userID="testUser" id={385687} isFavorite={true} />, mocks);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole('button').querySelector('.FavoriteIcon')).toBeDefined();
      fireEvent.click(button);
    });
    await waitFor(() => {});
    expect(screen.getByRole('button').querySelector('.FavoriteBorderIcon')).toBeDefined();
  });
});
