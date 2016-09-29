//MIND NAMES OF MODELS EmployeeReviews VS EmployerReviews
const EmployeeReviews = require('./employeeReviewsModel');
const EmployerReviews = require('./employerReviewsModel');

module.exports = {

	helloWorld: (req, res) => {
		res.send('hello Jobs');
	},

	createReview: (req, res) => {
		
	},

	queryReview: (req, res) => {
		EmployeeReviews.findAll({ where: { [req.query.field]: req.query.key } })
		.then((data) => {
			res.status(200).send(data);
		}).catch(error => res.status(500).send(`Job Not Found ${error}`));
	},

	getReviews: (req, res) => {
		EmployeeReviews.findAll().then((jobs) => {
			res.status(200).send(jobs);
		}).catch(error => res.status(500).send(`Sever Error ${error}`));
	},

};
