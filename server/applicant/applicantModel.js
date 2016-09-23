const Sequelize = require('sequelize');
const connection = require('../db/connection.js');
const Users = require('../user/userModel.js');
const Jobs = require('../job/jobModel.js');

const Applicant = connection.define('Applicants', {
	user_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Users,
			key: 'id',
		}
	},

	job_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Jobs,
			key: 'id',
		}
	},

	bid_price: {
		type: Sequelize.INTEGER,
	},

	job_status: {
		type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
	},
}, {
	freezeTableName: true,
});

Applicant.create = params => {
	//check if already applied
	return new Promise((resolve, reject) => {
		Applicant.findOne({
			where: {
				job_id: params.job_id,
				user_id: params.user_id
			}
		})
		.then(entry => {
			if (entry) {
				//check if user already applied
				reject('user already applied for the job');
			}
			if (!entry) {
				//create a new entry in applicants if not applied
				Applicant.build(params).save()
				.then(result => {
					resolve(result);
				})
			}
		})
		.catch(err => {
			reject(err);
		});
	});
};


module.exports = Applicant;
