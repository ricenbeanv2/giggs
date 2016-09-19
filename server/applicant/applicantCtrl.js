var applicant = require('./applicantModel.js');

module.exports.helloWorld = function(req, res) {
	res.send('hello applicants');
};
