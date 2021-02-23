const config = require('../config');
const mongoose = require('mongoose');

const uri = `${config.db.uri}:${config.db.port}/${config.db.collection}`;

const db = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to '${uri}'`);
});

require('./models/config');