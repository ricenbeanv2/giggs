var User = require('./userModel.js');

module.exports.helloWorld = function(req, res) {
	res.send('hello users');
};

