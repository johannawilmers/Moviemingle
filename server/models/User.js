const { model, Schema } = require('mongoose');

const CommentSchema = new Schema({
  comment: String,
  userID: String,
  movieID: Number,
});

const UserSchema = new Schema({
  userID: String,
  favorites: [Number],
  userComments: [CommentSchema],
});

const User = model('users', UserSchema);
module.exports = User;
