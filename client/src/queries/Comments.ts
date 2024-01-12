import { gql } from '@apollo/client';

const ADD_COMMENT = gql`
  mutation AddComment($addCommentId: Int!, $comment: String!, $userID: String) {
    addComment(id: $addCommentId, comment: $comment, userID: $userID) {
      comment
      userID
    }
  }
`;

const GET_ALL_COMMENTS = gql`
  query GetAllComments($movieId: Int!) {
    getAllComments(movieID: $movieId) {
      comment
      userID
    }
  }
`;

export { ADD_COMMENT, GET_ALL_COMMENTS };
