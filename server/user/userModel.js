var Sequelize = require('sequelize');
var connection = require('../db/connection.js');
var bcrypt = require('bcrypt');

var User = connection.define('Users', {
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

User.findUser = function(newUser){
	// connection.findAll({
	// 	where:{
	// 		username: newUser.username
	// 	}
	// }).then(function(result){
	// 	return result;
	// })
}

User.addUser = function(newUser){

}


module.exports = User;
