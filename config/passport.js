const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function init(passport) {
  const UserModel = mongoose.model('User');

  async function getUserByUsername(username) {
    const user = await UserModel.findOne({'username': username}).exec();
    return user.toObject();
  }

  async function getUserById(id) {
    const user = await UserModel.findById(id).exec();
    return user.toObject();
  }

  const authenticateUser = async (username, password, done) => {

    const user = await getUserByUsername(username);

    if(user === undefined) {
      return done(null, false, { message: 'No user with that email'});
    }

    try {
      if(await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect'});
      }
    } catch (e) {
      return done(e);
    }
  }

  passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser));
  passport.serializeUser((user, done) => { done(null, user._id) });
  passport.deserializeUser(async (id, done) => { return done(null, await getUserById(id)) });
}

module.exports = init;