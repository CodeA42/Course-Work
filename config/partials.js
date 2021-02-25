const handlebars = require('handlebars')

const userCard = require('../views/users/card.hbs');
handlebars.registerPartial('userCard', userCard);

const articleCard = require('../views/article/card');
handlebars.registerPartial('articleCard', articleCard);