const express = require('express');
const config = require('./config/config');
const app = express();
const passport = require('passport');

//Init DB
require('./config/db/init');

const routes = require('./routes'); //Db shoud init before routes

//Init passport
require('./config/passport')(passport);

//Init express
require('./config/express')(app);
app.use(routes);

//Init template partials
require('./config/partials');

app.listen(config.PORT, () => {console.log(`Server is running on port ${config.PORT}..`)});