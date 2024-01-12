const { model, Schema } = require('mongoose');

const genreSchema = new Schema(
  {
    _id: Number,
    name: String,
  },
  { collection: 'Genres' },
);

const allGenres = model('Genres', genreSchema);
module.exports = allGenres;
