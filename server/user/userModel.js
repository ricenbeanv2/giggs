const Sequelize = require('sequelize');
const connection = require('../db/connection');

const User = connection.define('Users', {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		isEmail: true,
		allowNull: false,
	},
}, {
	freezeTableName: true,
});

module.exports = User;
