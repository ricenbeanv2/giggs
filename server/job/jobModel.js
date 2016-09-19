var Sequelize = require('sequelize');
var connection = require('../db/connection.js');
var Categories = require('../category/categoryModel.js');
console.log('requiring users');
var Users = require('../user/userModel.js');

console.log('creating jobs');
var Jobs = connection.define('Jobs', {
	name: {
		type: Sequelize.STRING,
	},

	openings: {
		type: Sequelize.INTEGER,
		notNull: true,
	},

	description: {
		type: Sequelize.STRING,
		len: [0, 255],
		msg: "Description must be between 0 & 250 characters.",

	},

	category_id: {
		type: Sequelize.INTEGER,
		references: {
			 // This is the reference to another model
			 model: Categories,
			 // This is the column name of the referenced model
			 key: 'id',
		},
	},

	user_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Users,
			key: 'id',
		},
	},

	max_price: {
		type: Sequelize.INTEGER,
		notNull: true,
	},

	location_lat: {
		type: Sequelize.FLOAT,
	},

	location_lng: {
		type: Sequelize.FLOAT,
	},

	deadline: {
		type: Sequelize.DATE,
	},
}, {
	freezeTableName: true,
});

/*console.log('syncing jobs');
Jobs.sync({ force: true }).then(function() {
	console.log('Jobs table created');
});*/

module.exports = Jobs;
