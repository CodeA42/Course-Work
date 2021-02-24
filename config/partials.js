const handlebars = require('handlebars')

let userCard = require('../views/users/card.hbs');
handlebars.registerPartial('userCard', userCard);