var Sequelize = require('sequelize');

var connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 30000
	},

	options: {
		timezone: 'America/Los_Angeles',
	},

});

module.exports = connection;
