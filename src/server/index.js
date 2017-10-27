'use strict';
var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../assets/public')));
app.get('/', function(req, res) {
    res.json({success: true});
});

app.listen(port);
console.log('Server started. Listening on port', port);