var Sequelize = require('sequelize');

var connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql',

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 002ab4c7c9c3af4fdf184730649f704b626f952a
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	},

<<<<<<< HEAD
=======
=======
>>>>>>> ba2939a237f0d5f60facba575c269b6932bee2b7
>>>>>>> 002ab4c7c9c3af4fdf184730649f704b626f952a
	options: {
		timezone: 'America/Los_Angeles',
	},

});

module.exports = connection;
