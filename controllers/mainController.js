const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');

  const found = await ArticleModel.find({});
  console.log(found);

  res.render('home', {title: 'Home Page'});
});

router.get('/register', (req, res) => {
  res.render('users/register', {title: 'Register'});
});

router.get('/login', (req, res) => {
  res.render('users/login', {title: 'Login'});
});

module.exports = router;