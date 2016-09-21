const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const router = require('./config/routes');
const connection = require('./db/connection');

const app = express();
const path = require('path');

app.set('PORT', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./client'));
app.use('/client', express.static('./node_modules'));
app.use('/', router);

app.get('*', (request, response) => {
	response.sendFile(path.resolve('./', 'client', 'index.html'));
});

connection.sync().then(() => {
	console.log('tables synced');
});

app.listen(app.get('PORT'), () => {
	console.log(`[${moment().format('hh:mm:ss')}]Express Server listening on port`, app.get('PORT'));
});

module.exports = app;
