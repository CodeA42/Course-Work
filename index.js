const express = require('express');
const config = require('./config/config');
const app = express();
const routes = require('./routes');

require('./config/express')(app);

app.use(routes);

app.listen(config.PORT, () => {console.log(`Server is running on port ${config.PORT}..`)});