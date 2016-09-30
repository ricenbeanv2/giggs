const Applicant = require('./applicantModel');

const JOB_STATUS = ['pending', 'accepted', 'rejected', 'completed'];

module.exports = {
	applyJob: (req, res) => {
		const entry = {
			user_id: req.body.user_id,
			job_id: req.body.job_id,
			bid_price: req.body.bid_price,
			job_status: JOB_STATUS[0]
		};
		Applicant.create(entry)
		.then(data => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(200).send('failed to add applicant entry');
			}
		})
		.catch(err => {
			res.status(200).send(err);
		});
	},

	cancelApplied: (req, res) => {
		const entry = {
			user_id: req.body.user_id,
			job_id: req.body.job_id,
		};
		Applicant.cancel(entry)
		.then(data => {
			if (data) {
				res.status(200).send('application canceled');
			} else {
				res.status(200).send('failed to cancel application');
			}
		}).catch(err => {
			res.status(200).send(err);
		});
	},

	updateBid: (req, res) => {
		const entry = {
			user_id: req.body.user_id,
			job_id: req.body.job_id,
			bid_price: req.body.bid_price
		};
		Applicant.updateBid(entry)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(200).send(err);
		});
	},

	getApplicants: (req, res) => {
		Applicant.getApplicants(req.query.job_id)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(400).send(err);
		});
	},

	statusChange: (req, res) => {
		Applicant.statusChange(req.query)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(400).send(err);
		})
	}

};
