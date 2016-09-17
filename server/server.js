var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var moment = require('moment');
// var router = require('./config/router.js');

var app = express();

app.set('PORT', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./client'));
app.use('/lib', express.static('./node_modules'));
// app.use('/', router);

app.listen(app.get('PORT'), function() {
	console.log('[' + moment().format('hh:mm:ss') + ']' + ' Express Server listening on port', app.get('PORT'));
});

module.exports = app;
