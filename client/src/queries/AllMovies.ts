import { gql } from '@apollo/client';

const GET_MOVIES = gql`
  query getMovies($skip: Int, $limit: Int) {
    getMovies(skip: $skip, limit: $limit) {
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
`;

const GET_SINGLE_MOVIE = gql`
  query getMovie($id: Int!, $userID: String!) {
    getMovie(ID: $id, userID: $userID) {
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

const GET_FILTERED_MOVIE_COUNT = gql`
  query getFilteredMoviesCount($genre_id: Int, $search: String, $sortValue: String) {
    getFilteredMoviesCount(genre_id: $genre_id, search: $search, sortValue: $sortValue) {
      total
    }
  }
`;

function getFilteredMovies() {
  const GET_FILTERED_MOVIES = gql`
    query getFilteredMovies(
      $genre_id: Int
      $skip: Int
      $limit: Int
      $search: String
      $sortValue: String
      $userID: String
    ) {
      getFilteredMovies(
        genre_id: $genre_id
        skip: $skip
        limit: $limit
        search: $search
        sortValue: $sortValue
        userID: $userID
      ) {
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
  return GET_FILTERED_MOVIES;
}

export { GET_FILTERED_MOVIE_COUNT, GET_MOVIES, GET_SINGLE_MOVIE, getFilteredMovies };
