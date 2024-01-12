import { gql } from '@apollo/client';

function getFavoritesByUserID() {
  const GET_FAVORITES_BY_USER_ID = gql`
    query GetFavoritesByUserID($userID: String!) {
      getFavoritesByUserID(userID: $userID) {
        _id
        title
        original_title
        poster_path
        genre_ids
        overview
        release_date
        vote_average
        backdrop_path
        isFavorite
      }
    }
  `;
  return GET_FAVORITES_BY_USER_ID;
}

const ADD_FAVORITE = gql`
  mutation AddFavorite($userID: String!, $id: Int!) {
    addFavorite(userID: $userID, id: $id) {
      _id
      userID
    }
  }
`;

const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($userID: String!, $id: Int!) {
    removeFavorite(userID: $userID, id: $id) {
      _id
      userID
    }
  }
`;

const IS_FAVORITE = gql`
  query IsFavorite($userID: String!, $id: Int!) {
    isFavorite(userID: $userID, id: $id)
  }
`;
export { ADD_FAVORITE, getFavoritesByUserID, IS_FAVORITE, REMOVE_FAVORITE };
