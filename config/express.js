const express = require('express');
const handlebars = require('express-handlebars');

function configExpress(app) {
  app.engine('.hbs', handlebars({
    extname: 'hbs'
  }));
  
  app.set('view engine', 'hbs');
  
  app.use(express.static('public'));
}

module.exports = configExpress; 