const Sequelize = require('sequelize');
const connection = require('../db/connection');

const Categories = connection.define('Categories', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true,
	},

	parent_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'Categories',
			key: 'id',
		},
	},

}, {
	freezeTableName: true,
});

/*Categories.sync({ force: true }).then(function() {
	console.log('Categories table created');
});*/

module.exports = Categories;
