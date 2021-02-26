const mongoose = require('mongoose');

const authorsSchema = mongoose.Schema({
  fullName: String
 }, {_id:false});

const articleSchema = new mongoose.Schema({
 title: String,
 body: String,
 postDate: {type: Date, default: Date.now},
 authors: [authorsSchema]
});

mongoose.model('ArticleModel', articleSchema);