const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  created: {type: Date, default: Date.now},
  articles: [String]
});

 mongoose.model('User', userSchema);