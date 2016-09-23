const Applicant = require('./applicantModel');

module.exports = {
	applyJob: (req, res) => {
		const applicant = {
			user_id: req.body.user_id,
			job_id: req.body.job_id,
			bid_price: req.body.bid_price,
			job_status: 'pending'
		};
		
		res.status(200).send('applicant ctrl');
	},

	cancelApplied: (req, res) => {
		res.status(200).send('applicant ctrl');
	},

	getApplied: (req, res) => {
		res.status(200).send('applicant ctrl');
	},

	getAllApplicants: (req, res) => {
		res.status(200).send('applicant ctrl');
	},


	getPendings: (req, res) => {
		res.status(200).send('applicant ctrl');
	},

	getRejected: (req, res) => {
		res.status(200).send('applicant ctrl');
	},

	getAccepted: (req, res) => {
		res.status(200).send('applicant ctrl');
	},

	changeBid: (req, res) => {
		res.status(200).send('applicant ctrl');
	},


};
