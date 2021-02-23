const config = require('../config');
const mongoose = require('mongoose');

const uri = `${config.db.uri}:${config.db.port}/${config.db.collection}`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

require('./models/config');