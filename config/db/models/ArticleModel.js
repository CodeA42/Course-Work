const mongoose = require('mongoose');

const authorsSchema = mongoose.Schema({
  id: String
 }, {_id:false});

const commentSchema = mongoose.Schema({
  id: String
}, {_id: false})

const articleSchema = new mongoose.Schema({
 title: String,
 body: String,
 postDate: {type: Date, default: Date.now},
 authors: [authorsSchema],
 postedBy: String,
 comments: [commentSchema]
});

mongoose.model('ArticleModel', articleSchema);