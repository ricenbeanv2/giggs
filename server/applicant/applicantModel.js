const Sequelize = require('sequelize');
const connection = require('../db/connection');
const Users = require('../user/userModel');
const Jobs = require('../job/jobModel');

const Applicant = connection.define('Applicants', {
	user_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Users,
			key: 'id',
		},
		allowNull: false
	},

	job_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Jobs,
			key: 'id',
		},
		allowNull: false
	},

	bid_price: {
		type: Sequelize.INTEGER,
		allowNull: false
	},

	job_status: {
		type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
		allowNull: false
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
				reject(entry);
			}
			if (!entry) {
				//create a new entry in applicants if not applied
				Applicant.build(params).save()
				.then(result => {
					resolve(result);
				})
				.catch(err => {
					reject(err);
				});
			}
		})
		.catch(err => {
			reject(err);
		});
	});
};

Applicant.cancel = params => {
	return new Promise((resolve, reject) => {
		Applicant.findOne({
			where: {
				job_id: params.job_id,
				user_id: params.user_id
			}
		})
		.then(entry => {
			if (entry) {
				entry.destroy()
				.then(() => {
					resolve();
				});
			}
		})
		.catch(err => {
			reject(err);
		});
	});
};

module.exports = Applicant;
