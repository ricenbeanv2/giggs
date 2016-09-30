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

		const newReview = {
			review_id: req.body.review_id,
			job_id: req.body.job_id,
			[review]: req.body[review],
			[numReview]: req.body[numReview]
		};

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

	queryReview: (req, res) => {
		if (req.query.type == 'employee') {
			EmployeeReviews.findAll({ where: { [req.query.field]: req.query.key } })
			.then((data) => {
				res.status(200).send(data);
			}).catch(error => res.status(500).send(`Sever Error ${error}`));
		}
		if (req.query.type == 'employer') {
			EmployerReviews.findAll({ where: { [req.query.field]: req.query.key } })
			.then((data) => {
				res.status(200).send(data);
			}).catch(error => res.status(500).send(`Sever Error ${error}`));
		}
		
	},

	getReviews: (req, res) => {
		console.log(req.query)
		if (req.query.type == 'employee') {
			EmployeeReviews.findAll().then((reviews) => {
				res.status(200).send(reviews);
			}).catch(error => res.status(500).send(`Sever Error ${error}`));
		}
		if (req.query.type == 'employer') {
			EmployerReviews.findAll().then((reviews) => {
				res.status(200).send(reviews);
			}).catch(error => res.status(500).send(`Sever Error ${error}`));
		}
	},

};
