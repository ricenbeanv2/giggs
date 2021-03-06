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
		type: Sequelize.ENUM('pending', 'accepted', 'rejected', 'completed'),
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
				reject('user already applied for job');
			} else {
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
					resolve('Application canceled');
				})
				.catch(err => {
					reject(err);
				});
			} else {
				reject('application does not exists');
			}
		})
		.catch(err => {
			reject(err);
		});
	});
};

Applicant.updateBid = params => {
	return new Promise((resolve, reject) => {
		Applicant.findOne({
			where: {
				job_id: params.job_id,
				user_id: params.user_id
			}
		})
		.then(entry => {
			entry.update({ bid_price: params.bid_price })
			.then(result => {
				resolve(result);
			})
			.catch(err => {
				reject(err);
			});
		})
		.catch(err => {
			reject(err);
		});
	});
};

Applicant.getApplicants = jobID => {
	return new Promise((resolve, reject) => {
		Applicant.findAll({
			where: {
				job_id: jobID
			}
		})
		.then(result => {
			if (!result) {
				reject('no one applied for the job');
			} else {
				resolve(result);
			}
		})
		.catch(err => {
			reject(err);
		});
	});
};

Applicant.getJobsApplied = userId => {
		return new Promise((resolve, reject) => {
			Applicant.findAll({
				where: {
					user_id: userId
				}
			})
			.then(result => {
				if (!result) {
					reject('this user has not applied to any jobs');
				} else {
					resolve(result);
				}
			})
			.catch(err => {
				reject(err);
			});
		});
};

Applicant.statusChange = params => {
	return new Promise((resolve, reject) => {
		Applicant.findById(params.id)
		.then(entry => {
			if (entry) {
				entry.update({ job_status: params.job_status })
				.then(result => {
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
			} else {
				reject('application does not exists');
			}
		})
		.catch(err => {
			reject(err);
		});
	});
};

Applicant.queryEntry = params => {
	return new Promise((resolve, reject) => {
		Applicant.findOne({
			where: {
				job_id: params.job_id,
				user_id: params.user_id
			}
		})
		.then(result => {
			resolve(result);
		})
		.catch(error => {
			reject(error);
		});
	});
};

Applicant.changeAllStatus = params => {
	return new Promise((resolve, reject) => {
		Applicant.update(
			{ job_status: params.job_status },
			{ where: { job_id: params.job_id } })
			.then(affectedRows => {
				resolve(affectedRows);
			})
			.catch(err => {
				reject(err);
			});
	});
};
module.exports = Applicant;
