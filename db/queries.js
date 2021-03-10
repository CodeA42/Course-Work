const mongoose = require('mongoose');

const UserModel = mongoose.model('User');
const ArticleModel = mongoose.model('ArticleModel');
const CommentModel = mongoose.model('CommentModel');

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
  const article = await ArticleModel.findById(articleId).exec();
  article.comments.push({"id": commentId});
  article.save();
}

async function getUsernameFromId(id) {
  const usernameObj = await UserModel.findById(id).select('username -_id');
  return usernameObj?.username;
}

async function getUsernameIdFromId(id) {
  const user = await UserModel.findById(id).select('username');
  return user?.toObject();
}

async function getCommentFromId(id) {
  const comment = await CommentModel.findById(id).exec();
  let commentObj = comment?.toObject();
  commentObj.postedBy = await getUsernameIdFromId(commentObj.postedBy);
  return commentObj;
}

module.exports = {
  getUserByUsername,
  getUserById,
  getUserIdByUsername,
  updateUserById,
  addCommentToArticle,
  getCommentFromId,
  getUsernameFromId,
  getUsernameIdFromId
}
