const express = require('express');
const config = require('./config/config');
const app = express();
const routes = require('./routes');

//Init DB
require('./config/db/init');

//Init express
require('./config/express')(app);
app.use(routes);

require('./config/partials');

app.listen(config.PORT, () => {console.log(`Server is running on port ${config.PORT}..`)});