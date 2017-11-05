'use strict';
var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();

const routing = require('./routes');

const port = process.env.PORT || 3000;

// Import firebase config
require('./firebase');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../assets/public')));
routing(app);

app.listen(port);
console.log('Server started. Listening on port', port);