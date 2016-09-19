var Sequelize = require('sequelize');
var connection = require('../db/connection.js');

var Categories = connection.define('Categories', {
	name: {
		type: Sequelize.STRING,
		notNull: true,
		notEmpty: true,
	},
}, {
	freezeTableName: true,
});

/*Categories.sync({ force: true }).then(function() {
	console.log('Categories table created');
});*/

module.exports = Categories;