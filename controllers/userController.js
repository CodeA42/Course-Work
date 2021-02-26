const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

router.post('/register', async (req, res) => {
  const UserModel = mongoose.model('User');
  const user = new UserModel();

  const saltRounds = 8;
  const passwordPlain = req.body.password;

  const passwordHashed = await bcrypt.hash(passwordPlain, saltRounds);
  
  user.username = req.body.username;
  user.password = passwordHashed;
  user.created = new Date();

  const saved = await user.save();
  console.log(saved);
  res.redirect(`/user/${saved._id}`);
});

router.get('/:id', async (req, res) => {
  const UserModel = mongoose.model('User');

  try {
    const user = await UserModel.findById(req.params.id).exec();
    const userObj = user.toObject();
    res.render('user/profile', {title: userObj.username, userObj});
  } catch(e) {
    res.status(404).render('user/404', {title: 'User not found', id: req.params.id});
  }
  
});

module.exports = router;