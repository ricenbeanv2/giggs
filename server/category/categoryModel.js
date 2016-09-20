const Sequelize = require('sequelize');
const connection = require('../db/connection');

const Categories = connection.define('Categories', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true,
	},
}, {
	freezeTableName: true,
});

/*Categories.sync({ force: true }).then(function() {
	console.log('Categories table created');
});*/

module.exports = Categories;
