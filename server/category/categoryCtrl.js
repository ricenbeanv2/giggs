const Category = require('./categoryModel');

module.exports.createDummyCategories = function(req, res) {
	//dummy data for categories
	const dummyData = [
		{ name: 'plumbing' },
		{ name: 'tutor' },
		{ name: 'tech' },
		{ name: 'auto' },
		{ name: 'cook' }
	];

	Category.bulkCreate(dummyData).then(function(categories) { 
				console.log('check database for categories');
				res.send(categories);
			})
			.catch(function(error) {
				console.log(error); // ... in order to get the array of user objects
				res.send(error);
			});
};
