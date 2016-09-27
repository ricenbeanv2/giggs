const Category = require('./categoryModel');

module.exports = {

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
	},

	getParentCategories: (req, res) => {
		Category.findAll({ where: { parent_id: null } })
			.then((data) => {
				res.status(200).send(data);
			}).catch(error => res.status(500).send(`Parent categories not found ${error}`));
	}
};
