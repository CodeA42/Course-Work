const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');

  const articleCount = await ArticleModel.find().estimatedDocumentCount();
  const page = req.query.p ?? 0;
  const articles = await ArticleModel.find().limit(5).skip(page * 5);
  const article = articles.map(e => e.toObject());

  res.render('home', {title: 'Home Page', article});
});

router.get('/register', (req, res) => {
  res.render('users/register', {title: 'Register'});
});

router.get('/login', (req, res) => {
  res.render('users/login', {title: 'Login'});
});

module.exports = router;