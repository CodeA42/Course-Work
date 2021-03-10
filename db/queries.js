const mongoose = require('mongoose');

const UserModel = mongoose.model('User');

async function getUserByUsername(username) {
  const user = await UserModel.findOne({'username': username}).exec();
  return user?.toObject();
}

async function getUserById(id) {
  const user = await UserModel.findById(id).exec();
  return user?.toObject();
}

async function getUserIdByUsername(username) {
  const user = await getUserByUsername(username)
  return user?._id;
}

async function updateUserById(userId, updatedInfo) {
  const user = UserModel.findByIdAndUpdate(userId, updatedInfo, {new: true});
  return user?.toObject();
}

async function addCommentToArticle(commentId, articleId) {
  const article = ArticleModel.findById(articleId);
  article.comments.push(commentId);
  article.save();
}

module.exports = {
  getUserByUsername,
  getUserById,
  getUserIdByUsername,
  updateUserById,
  addCommentToArticle
}
