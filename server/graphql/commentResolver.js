const Comments = require('../models/Comment');

/**
 * Resolver for GraphQL queries related to comments.
 * @namespace
 */
module.exports = {
  Query: {
    async getAllComments(_, { movieID }) {
      try {
        const comments = await Comments.find({ movieID });
        if (!comments) {
          return new Error('No comments found');
        }
        return comments;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
