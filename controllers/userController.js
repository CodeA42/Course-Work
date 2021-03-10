const { Router } = require('express');
const router = Router();
const config = require('../config/config');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const middlewares = require('../config/middlewares');

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

router.get('/:id', middlewares.checkAuthenticated, async (req, res) => {
  const UserModel = mongoose.model('User');

  try {
    const user = await UserModel.findById(req.params.id).exec();
    const userObj = user.toObject();
    res.render('user/profile', {title: userObj.username, userObj, user: req.user});
  } catch(e) {
    res.status(404).render('user/404', {title: 'User not found', id: req.params.id, user: req.user});
  }
  
});



module.exports = router;