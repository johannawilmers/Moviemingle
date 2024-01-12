import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation AddUser($userID: String!) {
    addUser(userID: $userID) {
      userID
      favorites {
        _id
        title
        original_title
        poster_path
        genre_ids
        overview
        release_date
        vote_average
        backdrop_path
      }
    }
  }
`;

const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers
  }
`;

export { ADD_USER, GET_ALL_USERS };
