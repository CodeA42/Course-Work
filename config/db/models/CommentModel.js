const mongoose = require('mongoose');

const commentSchema =new mongoose.Schema({
  body: String,
  postedBy: String,
  created: {type: Date, default: Date.now},
  article: String
});

mongoose.model('CommentModel', commentSchema);