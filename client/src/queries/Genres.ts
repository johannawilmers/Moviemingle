import { gql } from '@apollo/client';

const GET_GENRE = gql`
  query getGenre($id: ID!) {
    getGenre(id: $id) {
      _id
      name
    }
  }
`;

const GET_ALL_GENRES = gql`
  query getAllGenres {
    getAllGenres {
      _id
      name
    }
  }
`;
export { GET_ALL_GENRES, GET_GENRE };
