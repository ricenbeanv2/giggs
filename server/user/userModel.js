var Sequelize = require('sequelize');
var connection = require('../db/connection.js');
var bcrypt = require('bcrypt');

var Users = connection.define('Users', {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true
	},
	fb_id: {
		type: Sequelize.STRING,
		notNull: false,
		notEmpty: true,
	},

	email: {
		type: Sequelize.STRING,
		isEmail: true,
		allowNull: false,
		notEmpty: true,
	},
}, {
	freezeTableName: true,
});

// .create

module.exports = Users;
