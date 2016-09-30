const Sequelize = require('sequelize');
const connection = require('../db/connection');
const Jobs = require('../job/jobModel');
const Users = require('../user/userModel');

const EmployeeReviews = connection.define('EmployeeReviews', {

	review_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: Users,
			key: 'id',
		},
	},

	job_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: Jobs,
			key: 'id',
		},
	},

	employeeReview: {
		type: Sequelize.STRING,
		len: [0, 255],
		msg: 'Review must be between 0 & 255 characters.',
	},

	numericalEmployeeReview: {
		type: Sequelize.STRING,
		len: [0, 1],
		isBetweenZeroAndFive: function(value) {
			if(parseInt(value) % 2 != 0 && value <= 5 && value >= 0) {
				throw new Error('Only values Between 0-5 are allowed!');
			}
		},
	},

}, {
	freezeTableName: true,
});

module.exports = EmployeeReviews;
