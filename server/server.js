// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const router = require('./config/routes');
// const connection = require('./db/connection');
// const flash = require('connect-flash');
// const passport = require('passport');
// const moment = require('moment');
//
// const app = express();
// app.set('PORT', process.env.PORT || 3000);
//
// //connect to database
// connection.sync().then(() => {
// 	console.log('tables synced');
// });
// //pass passport for configuration
// require('./config/passport')(passport);
// //app configuration
// app.configure(() => {
// 	app.use(cors());
// 	app.use(express.loger('dev'));
// 	app.use(express.cookieParser());
// 	app.use(express.bodyParser());
// 	//require for passport
// 	app.use(express.session({ secret: 'giggsisthebest' }));
// 	app.use(passport.initialize());
// 	app.use(passport.session());
// 	app.use(flash());
// 	//
// 	app.use(express.static('./client'));
// });
//
//
//
//
//
//
// //for passport use
// // const routes = require('./config/routes')(passport);
// //end of passport test
//
// app.use(bodyParser.json());
// app.use('/client', express.static('./node_modules'));
// app.use('/', router);
//
// app.get('*', (request, response) => {
// 	response.sendFile(path.resolve('./', 'client', 'index.html'));
// });
//
//
// app.listen(app.get('PORT'), () => {
// 	console.log(`[${moment().format('hh:mm:ss')}]Express Server listening on port`, app.get('PORT'));
// });
//
// module.exports = app;
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
