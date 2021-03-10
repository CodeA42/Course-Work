const mongoose = require('mongoose');

const commentSchema =new mongoose.Schema({
  body: String,
  postedBy: String,
  created: {type: Date, default: Date.now},
  articleId: String
});

mongoose.model('CommentModel', commentSchema);