var Sequelize = require('sequelize');
var connection = require('../db/connection.js');

console.log('defining users');
var Users = connection.define('Users', {
	name: {
		type: Sequelize.STRING,
		notNull: true,
		notEmpty: true,
	},

	password: {
		type: Sequelize.STRING,
		notNull: true,
		notEmpty: true,
	},
	
	fb_id: {
		type: Sequelize.STRING,
		notNull: false,
		notEmpty: true,
	},
	
	email: {
		type: Sequelize.STRING,
		isEmail: true,
		notNull: true,
		notEmpty: true,
	},
}, {
	freezeTableName: true,
});

/*console.log('syncing users');
Users.sync({ force: true }).then(function() {
	console.log('User table created');
});*/

module.exports = Users;
