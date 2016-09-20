const Sequelize = require('sequelize');
const connection = require('../db/connection');
const Categories = require('../category/categoryModel');
const Users = require('../user/userModel');

const Jobs = connection.define('Jobs', {
	jobName: {
		type: Sequelize.STRING,
	},

	openings: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},

	description: {
		type: Sequelize.STRING,
		len: [0, 255],
		msg: 'Description must be between 0 & 250 characters.',

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
		allowNull: false,
		references: {
			model: Users,
			key: 'id',
		},
	},

	max_price: {
		type: Sequelize.INTEGER,
		allowNull: false,
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
