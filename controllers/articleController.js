const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const dbQueries = require('../db/queries');
const middlewares = require('../config/middlewares');

router.get('/create', middlewares.checkAuthenticated, (req, res) => {
  res.render('article/create', {title: 'Create Article', user: req.user});
});

router.post('/create', middlewares.checkAuthenticated, async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');
  const UserModel = mongoose.model('User');

  const inputList = req.body.authors
  .split(',')
  .map(e => e.trim())
  .filter(function t(e, index, arr) {
    for (let i = 0; i < index; i++) {
      if(e == arr[i]) {
        return false;
      }
    }
    return true;
  });

  const authorsList = await getUserList(inputList);
  const userList = authorsList.filter(e => e != null).map(e =>{return  {"id": e}});

  async function getUserList(authorsList) {
    return Promise.all(authorsList.map(async function (username) {
      const id = await dbQueries.getUserIdByUsername(username);
      return (id) ? id.toString() : null;
    }))
  }

  const article = new ArticleModel();

  article.title = req.body.title;
  article.body = req.body.content;
  article.authors = userList;
  article.postDate = new Date();
  article.postedBy = req.user._id;
  article.comments = [];

  const saved = await article.save();

  function updateUsers() {
    const savedObj = saved.toObject();
    
    savedObj.authors.forEach(async function(e) {
      const user = await UserModel.findById(e.id).exec();
      user.articles.push(savedObj._id);
      user.save();
    })
  }
  updateUsers();
  res.redirect(`/article/${saved._id}`);
});

router.get('/:id', async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');
  const UserModel = mongoose.model('User');
  const CommentModel = mongoose.model('CommentModel');

  try {
    const article = await ArticleModel.findById(req.params.id).exec();
    let articleObj = article.toObject();

    articleObj.authors = await getUserList(articleObj.authors);

    async function getUserList(authorsId) {
      return Promise.all(authorsId.map(async e => await dbQueries.getUserById(e.id)));
    }

    articleObj.comments = await getComments(articleObj.comments);

    async function getComments(commentsId) {
      return Promise.all(commentsId.map(async e => await dbQueries.getCommentFromId(e.id)));
    }
    
    res.render('article/view', {article: articleObj, user: req.user});
  } catch(e) {
    console.error(e);
    res.status(404).render('article/404', {title: 'Article not found', id: req.params.id, user: req.user});
  }
});

router.post('/comment', middlewares.checkAuthenticated, async (req, res) => {
  const CommentModel = mongoose.model('CommentModel');

  const comment = new CommentModel();

  comment.body = req.body.comment;
  comment.postedBy = req.user._id;
  comment.postDate = new Date();
  comment.articleId = req.body.articleId;

  const saved = await comment.save();
  const savedObj = saved.toObject();
  dbQueries.addCommentToArticle(savedObj._id, req.body.articleId);
  res.redirect(`/article/${req.body.articleId}`);
});

module.exports = router;