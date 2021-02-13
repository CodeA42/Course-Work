const express = require('express');
const config = require('./config/config');
const app = express();

require('./config/express')(app);

app.get('/', (req, res) => {
  console.log("It's working!");
  res.render('home', {layout: false});
});

app.listen(config.PORT, () => {console.log(`Server is running on port ${config.PORT}..`)});