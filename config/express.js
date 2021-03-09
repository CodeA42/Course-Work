if(process.env.NODE_ENV !== 'present') {
  require('dotenv').config();
}

const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport')

function configExpress(app) {
  app.engine('.hbs', handlebars({
    extname: 'hbs'
  }));
  
  app.set('view engine', 'hbs');
  
  app.use(express.static('public'));
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

}

module.exports = configExpress; 