const AllMovies = require('../models/Movie');
const User = require('../models/User');

/**
 * @typedef {import('mongoose').Model<import('../models/Movie').Movie>} MovieModel
 * @typedef {import('mongoose').Model<import('../models/User').User>} UserModel
 */

/**
 * Resolvers for GraphQL queries related to movies.
 * @type {object}
 */
module.exports = {
  Query: {
    async getMovies(_, { skip, limit }) {
      try {
        const movies = await AllMovies.find().skip(skip).limit(limit);
        return movies;
      } catch (error) {
        console.log(error);
      }
    },
    async getMovie(_, { ID, userID }) {
      try {
        const user = await User.findOne({ userID });
        const favoriteMovieIds = user.favorites || [];
        const movie = await AllMovies.aggregate([
          {
            $match: {
              _id: ID,
            },
          },
          {
            $addFields: {
              isFavorite: { $in: ['$_id', favoriteMovieIds] },
            },
          },
        ]);
        if (movie.length === 0) {
          return new Error('Movie not found');
        }
        return movie[0];
      } catch (error) {
        console.error();
      }
    },

    async getFilteredMovies(_, { genre_id, skip, limit, search, sortValue, userID }) {
      const sortOptions = {
        1111: { $sort: { title: 1 } },
        2222: { $sort: { title: -1 } },
        3333: { $sort: { vote_average: 1 } },
        4444: { $sort: { vote_average: -1 } },
      };

      const s = sortOptions[sortValue];

      try {
        const user = await User.findOne({ userID });

        const pipeline = [
          {
            $match: {
              title: { $regex: search, $options: 'i' },
              ...(genre_id !== 1 && genre_id && { genre_ids: { $in: [genre_id] } }),
            },
          },
        ];

        if (s) {
          pipeline.push(s);
        }
        if (user && user.favorites) {
          pipeline.push({
            $addFields: {
              isFavorite: { $in: ['$_id', user.favorites] },
            },
          });
        }
        return AllMovies.aggregate(pipeline).skip(skip).limit(limit);
      } catch (error) {
        console.log(error + ' - This operation failed');
        throw error;
      }
    },
    async getFilteredMoviesCount(_, { genre_id, search, sortValue }) {
      try {
        const query = {
          title: { $regex: search, $options: 'i' },
        };
        if (genre_id > 1) {
          query.genre_ids = { $in: [genre_id] };
        }
        const count = await AllMovies.countDocuments(query);
        return { total: count };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
