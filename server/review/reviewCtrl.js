/********** MIND NAMES OF MODELS Employee VS Employer **********/
const EmployeeReviews = require('./employeeReviewsModel');
const EmployerReviews = require('./employerReviewsModel');

module.exports = {
	createReview: (req, res) => {
		const newReview = {
			user_id: req.body.user_id,
			rated_user: req.body.rated_user,
			job_id: req.body.job_id,
			review: req.body.review,
			rating: req.body.rating
		};

		function reviewCreation(type, review) {
			type.findOne({ where:
				{
					user_id: review.user_id,
					rated_user: review.rated_user,
					job_id: review.job_id
				}
			})
			.then(entry => {
				if (!entry) {
					type.create(review)
					.then(rev => {
						res.status(201).send(rev);
					})
					.catch(error => {
						res.status(500).send(`Server Error Review Not Created ${error}`);
					});
				} else {
					res.status(200).send('Review already exists');
				}
			})
			.catch(error => {
				res.status(500).send(error);
			})
		}

		if (req.body.type === 'employee') {
			reviewCreation(EmployeeReviews, newReview);
		}
		if (req.body.type === 'employer') {
			reviewCreation(EmployerReviews, newReview);
		}
	},

	queryReview: (req, res) => {
		if (req.query.type === 'employee') {
			EmployeeReviews.findAll({ where: { [req.query.field]: req.query.key } })
			.then(data => {
				res.status(200).send(data);
			})
			.catch(error => res.status(500).send(`Sever Error ${error}`));
		}
		if (req.query.type === 'employer') {
			EmployerReviews.findAll({ where: { [req.query.field]: req.query.key } })
			.then(data => {
				res.status(200).send(data);
			})
			.catch(error => res.status(500).send(`Sever Error ${error}`));
		}
		if (!req.query.type) {
			res.status(500).send('Query type not specified');
		}
	},

	singleReview: (req, res) => {
		if (req.query.type === 'employee') {
			EmployeeReviews.findOne({ where: {
					job_id: req.query.job_id,
					user_id: req.query.user_id
				}
			})
			.then(entry => {
				res.status(200).send(entry);
			})
			.catch(error => {
				res.status(500).send(error);
			});
		}
		if (req.query.type === 'employer') {
			EmployerReviews.findOne({ where: {
					job_id: req.query.job_id,
					rated_user: req.query.rated_user,
					user_id: req.query.user_id
				}
			})
			.then(entry => {
				res.status(200).send(entry);
			})
			.catch(error => {
				res.status(500).send(error);
			});
		}
		if (!req.query.type) {
			res.status(500).send('Query type not specified');
		}
	},

	getReviews: (req, res) => {
		if (req.query.type === 'employee') {
			EmployeeReviews.findAll()
			.then(reviews => {
				res.status(200).send(reviews);
			})
			.catch(error => {
				res.status(500).send(`Sever Error ${error}`);
			});
		}
		if (req.query.type === 'employer') {
			EmployerReviews.findAll()
			.then(reviews => {
				res.status(200).send(reviews);
			})
			.catch(error => {
				res.status(500).send(`Sever Error ${error}`);
			});
		}
	},

};
