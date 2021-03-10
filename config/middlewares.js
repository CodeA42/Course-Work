const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

module.exports = {
  urlencodedParser,
  checkAuthenticated,
  checkNotAuthenticated
};