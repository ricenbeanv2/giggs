const Sequelize = require('sequelize');
const connection = require('../db/connection');
const Jobs = require('../job/jobModel');
const Users = require('../user/userModel');
const Employee = require('./employeeReviewsModel');

const EmployerReviews = connection.define('EmployerReviews', {

	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: Users,
			key: 'id',
		},
	},

	rated_user: {
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

	review: {
		type: Sequelize.STRING,
		len: [0, 255],
		msg: 'Review must be between 0 & 255 characters.',
	},

	rating: {
		type: Sequelize.STRING,
		len: [0, 1],
		isBetweenZeroAndFive: value => {
			if (parseInt(value, 10) % 2 !== 0 && value <= 5 && value >= 0) {
				throw new Error('Only values Between 0-5 are allowed!');
			}
		},
	},

}, {
	freezeTableName: true,
});

module.exports = EmployerReviews;
