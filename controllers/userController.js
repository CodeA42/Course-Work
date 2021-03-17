const { Router } = require('express');
const router = Router();
const config = require('../config/config');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const middlewares = require('../config/middlewares');
const dbQueries = require('../db/queries');

router.post('/register', middlewares.checkNotAuthenticated, async (req, res) => {
  const UserModel = mongoose.model('User');
  const user = new UserModel();

  if(await UserModel.where({'username': req.body.username}).countDocuments()) {
    return res.redirect(`/register`);
  }

  const saltRounds = config.hashSalt;
  const passwordPlain = req.body.password;
  try {
    const passwordHashed = await bcrypt.hash(passwordPlain, saltRounds);

    user.username = req.body.username;
    user.password = passwordHashed;
    user.created = new Date();

    const saved = await user.save();

    res.redirect(`/user/${saved._id}`);
  } catch(e) {
    console.error(e);
    res.redirect(`/register`);
  }
});

router.post('/login', middlewares.checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/:id', middlewares.checkAuthenti cated, async (req, res) => {
  const UserModel = mongoose.model('User');

  try {
    const user = await UserModel.findById(req.params.id).exec();
    const userObj = user.toObject();
    res.render('user/profile', {title: userObj.username, userObj, user: req.user});
  } catch(e) {
    res.status(404).render('user/404', {title: 'User not found', id: req.params.id, user: req.user});
  }
});

router.get('/:id/articles', middlewares.checkAuthenticated, async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');
  const UserModel = mongoose.model('User');

  const searchObj = {"authors.id": req.params.id};
  const articleCount = await ArticleModel.countDocuments(searchObj);
  const page = req.query.p ?? 0;
  const articlesArr = await ArticleModel.find(searchObj).limit(5).skip(page * 5);
  const articles = articlesArr.map(e => e.toObject());

  try {
    const user = await UserModel.findById(req.params.id).exec();
    const userObj = user?.toObject();
    const pages = (function(ac) {
      let pages = [];
      for (let i = 0; i < Math.ceil(ac / 5); i++) {
      pages.push({p: i, id: userObj._id});
    } return pages})(articleCount);
    res.render('user/articles', {title: 'User Articles', userObj, articles, pages, user: req.user});
  } catch(e) {
    console.error(e);
    res.status(404).render('user/404', {title: 'User not found', id: req.params.id, user: req.user});
  }
});



module.exports = router;