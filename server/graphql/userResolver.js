const AllMovies = require('../models/Movie');
const User = require('../models/User');
const Comments = require('../models/Comment');

/**
 * @typedef {import('mongoose').Model<import('../models/Movie').Movie>} MovieModel
 * @typedef {import('mongoose').Model<import('../models/User').User>} UserModel
 * @typedef {import('mongoose').Model<import('../models/Comment').Comment>} CommentModel
 */

/**
 * Resolvers for GraphQL queries and mutations related to users.
 * @type {object}
 */
module.exports = {
  Query: {
    async getFavoritesByUserID(_, { userID }) {
      try {
        const user = await User.findOne({ userID });
        const userFavorites = user.favorites;
        const favoriteMovies = await AllMovies.aggregate([
          {
            $match: {
              _id: { $in: userFavorites },
            },
          },
          {
            $addFields: {
              isFavorite: true,
            },
          },
        ]);

        if (!userFavorites) {
          return [];
        }

        return favoriteMovies;
      } catch (error) {
        console.error(error);
        throw new Error('Error retrieving favorites');
      }
    },
    async getAllUsers() {
      try {
        const userlist = [];
        const users = await User.find();
        users.forEach((user) => {
          userlist.push(user.userID);
        });
        return userlist;
      } catch (error) {
        console.error(error);
      }
    },
  },

  Mutation: {
    addUser: async (_, { userID }) => {
      const user = new User({ userID, favorites: [], userComments: [] });
      return await user.save();
    },
    async addComment(_, { id, comment, userID }) {
      try {
        const movie = await AllMovies.findById(id);
        if (!movie) {
          return new Error('Movie not found');
        }
        const user = await User.findOne({ userID });
        if (!user) {
          return new Error('User not found');
        }
        const newComment = { movieID: id, userID, comment };
        const comments = await Comments.create(newComment);
        await comments.save();
        return newComment;
      } catch (error) {
        console.error();
      }
    },
    async addFavorite(_, { id, userID }) {
      try {
        const user = await User.findOne({ userID });
        if (!user) {
          throw new Error('User not found');
        }
        if (user.favorites.includes(id)) {
          return new Error('Movie is already in favorites');
        } else {
          user.favorites.push(id);
          await user.save();
        }
      } catch (error) {
        throw new Error(`Failed to add favorite: ${error.message}`);
      }
    },
    async removeFavorite(_, { id, userID }) {
      try {
        const user = await User.findOne({ userID });
        if (!user) {
          throw new Error('User not found');
        }

        if (!user.favorites.includes(id)) {
          return new Error('Movie was not found in your favorite collection');
        }

        user.favorites = user.favorites.filter((movieId) => movieId !== id);
        await user.save();
      } catch (error) {
        throw new Error(`Failed to remove favorite: ${error.message}`);
      }
    },
  },
};
