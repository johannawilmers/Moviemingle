const { model, Schema } = require('mongoose');

const commentSchema = new Schema(
  {
    movieID: Number,
    userID: String,
    comment: String,
  },
  { collection: 'Comments' },
);

const allComments = model('Comments', commentSchema);
module.exports = allComments;
