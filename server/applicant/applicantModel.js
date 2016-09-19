var Sequelize = require('sequelize');
var connection = require('../db/connection.js');
var Users = require('../user/userModel.js');
var Jobs = require('../job/jobModel.js');

var Applicants = connection.define('Applicants', {
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

/*Applicants.sync({ force: true }).then(function() {
	console.log('Applicants table created');
});*/

module.exports = Applicants;
