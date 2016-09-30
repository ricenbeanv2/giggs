/********** MIND NAMES OF MODELS Employee VS Employer **********/
const EmployeeReviews = require('./employeeReviewsModel');
const EmployerReviews = require('./employerReviewsModel');

module.exports = {

	helloWorld: (req, res) => {
		res.send('hello Jobs');
	},

	createReview: (req, res) => {
		let review = req.body.type + 'Review';
		let numReview = 'numerical' + req.body.type[0].toUpperCase() + req.body.type.substring(1) + 'Review';

		console.log(review)
		console.log(numReview)

		const newReview = {
			review_id: req.body.review_id,
			job_id: req.body.job_id,
			[review]: req.body[review],
			[numReview]: req.body[numReview]
		};

		console.log(newReview)

		function reviewCreation(type, review) {
			type.create(review).then((rev) => {
				res.status(201).send(rev);
			})
			.catch((error) => {
				res.status(500).send(`Server Error Review Not Created ${error}`);
			});
		}

		if (req.body.type == 'employee') {
			reviewCreation(EmployeeReviews, newReview);
		}
		if (req.body.type == 'employer') {
			reviewCreation(EmployerReviews, newReview);
		}
	},

	createEmployerReview: (req, res) => {
		
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
