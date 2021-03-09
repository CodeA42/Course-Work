const express = require('express');
const config = require('./config/config');
const app = express();
const routes = require('./routes');
const passport = require('passport');

//Init DB
require('./config/db/init');

//Init passport
require('./config/passport')(passport);

//Init express
require('./config/express')(app);
app.use(routes);

//Register template partials
require('./config/partials');

app.listen(config.PORT, () => {console.log(`Server is running on port ${config.PORT}..`)});