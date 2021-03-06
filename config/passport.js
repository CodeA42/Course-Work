const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const dbQueries = require('../db/queries');

function init(passport) {
  const authenticateUser = async (username, password, done) => {

    const user = await dbQueries.getUserByUsername(username);

    if(user === undefined) {
      return done(null, false, { message: 'No user with that username'});
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
  passport.deserializeUser(async (id, done) => { return done(null, await dbQueries.getUserById(id)) });
}

module.exports = init;