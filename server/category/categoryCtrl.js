const Category = require('./categoryModel');
const categoryData = require('./categoryData');

module.exports = {

	propagateCategories: (req, res) => {
		const total = (function c(t) { return Object.keys(t).length + Object.keys(t).map((k) => t[k]).map((t) => c(t)).reduce((a, b) => a + b, 0)})(categoryData);
		let rowsInserted = 0;

		function insertCategories(categories, parentID = null) {
			for (const category of Object.keys(categories)) {
				//this will create the first lvl of categories, because parentID
				//default to null, parentID will be null
				Category.create({ name: category, parent_id: parentID })
					.then(cat => {
						if (categories[category] != null) {
							insertCategories(categories[category], cat.dataValues.id);
						}
						rowsInserted++;
						if (total === rowsInserted) {
							res.status(201).send('categories created');
						}
						return category;
					})
					.catch((error) => {
						console.log(error);
						res.status(500).send(`Server Error Catagories not Loaded ${error}`);
					});
			}
		}

		insertCategories(categoryData);
	},

	queryCategory: (req, res) => {
		Category.findAll({ where: { [req.query.field]: JSON.parse(req.query.key) } })
		.then((data) => {
			res.status(200).send(data);
		}).catch(error => res.status(500).send(`Category Not Found ${error}`));
	},

	getAllCategories: (req, res) => {
		Category.findAll().then((cat) => {
			res.status(200).send(cat);
		}).catch(error => res.status(500).send(`Sever Error ${error}`));
	}

};
