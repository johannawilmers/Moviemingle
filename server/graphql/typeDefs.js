const { gql } = require('apollo-server');

module.exports = gql`
  type Movie {
    _id: Int
    title: String
    original_title: String
    poster_path: String
    genre_ids: [Int]
    overview: String
    release_date: String
    vote_average: Float
    backdrop_path: String
    isFavorite: Boolean
  }

  type Genre {
    _id: Int
    name: String
  }

  type Comment {
    movieID: Int
    userID: String
    comment: String!
  }

  type User {
    _id: ID
    userID: String!
    favorites: [Movie]
    userComments: [Comment]
  }

  type movieCount {
    total: Int
  }

  type Query {
    getMovies(skip: Int, limit: Int): [Movie]
    getMovie(ID: Int!, userID: String!): Movie
    getGenre(ID: Int!): Genre
    getFilteredMovies(genre_id: Int, skip: Int, limit: Int, search: String, sortValue: String, userID: String): [Movie]
    getFavoritesByUserID(userID: String): [Movie]
    isFavorite(userID: String, id: Int): Boolean!
    getFilteredMoviesCount(genre_id: Int, search: String, sortValue: String): movieCount
    getAllComments(movieID: Int!): [Comment]
    getAllGenres: [Genre]
    getAllUsers: [String]
  }

  type Mutation {
    addComment(id: Int!, comment: String!, userID: String): Comment
    addFavorite(userID: String!, id: Int!): User
    removeFavorite(userID: String!, id: Int!): User
    addUser(userID: String!): User
  }
`;
