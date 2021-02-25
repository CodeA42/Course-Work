const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');

  const articleCount = await ArticleModel.find().estimatedDocumentCount();
  const page = req.query.p ?? 0;
  const articlesArr = await ArticleModel.find().limit(5).skip(page * 5);
  const articles = articlesArr.map(e => e.toObject());

  const pages = (function(ac) {
    let pages = [];
    for (let i = 0; i < Math.ceil(ac / 5); i++) {
    pages.push(i);
  } return pages})(articleCount);

  res.render('home', {title: 'Home Page', articles, pages});
});

router.get('/register', (req, res) => {
  res.render('users/register', {title: 'Register'});
});

router.get('/login', (req, res) => {
  res.render('users/login', {title: 'Login'});
});

module.exports = router;