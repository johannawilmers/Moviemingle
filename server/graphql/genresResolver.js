const AllGenres = require('../models/Genre');
const allGenres = require('../models/Genre');

/**
 * @typedef {import('mongoose').Model<import('../models/Genre').Genre>} GenreModel
 */

/**
 * Resolvers for GraphQL queries related to genres.
 * @type {object}
 */
module.exports = {
  Query: {
    async getGenre(_, { ID }) {
      try {
        const genre = await AllGenres.findById(ID);
        if (!genre) {
          return new Error('Genre not found');
        }
        return genre;
      } catch (error) {
        console.error();
        throw new Error(error);
      }
    },
    async getAllGenres() {
      try {
        const genres = await allGenres.find();
        genres.sort((a, b) => {
          if (a.name === 'All movies') {
            return -1;
          }
          return a.name.localeCompare(b.name);
        });
        return genres;
      } catch (error) {
        console.error();
        throw new Error(error);
      }
    },
  },
};
