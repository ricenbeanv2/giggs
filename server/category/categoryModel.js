const Sequelize = require('sequelize');
const connection = require('../db/connection');
const data = require('./categoryData');

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
	hooks: {
		afterSync: function() {
			this.findOne({ where: { id: 1 }
			}).then((found) => {
				if (!found) {
					propagateCategories(data);
				}
			}).catch(error => res.send(error));
		},
	},
	freezeTableName: true,
});

function propagateCategories(data) {

	function insertCategories(data, parentID = null) {
		for (const category of Object.keys(data)) {
			Categories.create({ name: category, parent_id: parentID })
				.then(cat => {
					if (data[category] != null) {
						insertCategories(data[category], cat.dataValues.id);
					}
					return category;
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	insertCategories(data);
}

/*Categories.sync({ force: true }).then(function() {
	console.log('Categories table created');
});*/

module.exports = Categories;
