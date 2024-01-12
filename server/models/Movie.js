const { model, Schema } = require('mongoose');

const movieSchema = new Schema(
  {
    _id: Number,
    title: String,
    original_title: String,
    poster_path: String,
    backdrop_path: String,
    genre_ids: [Number],
    overview: String,
    release_date: String,
    vote_average: Number,
    isFavorite: Boolean,
  },
  { collection: 'AllMovies' },
);

const AllMovies = model('AllMovies', movieSchema);
module.exports = AllMovies;
