const Job = require('./jobModel');
const Category = require('../category/categoryModel');
const Users = require('../user/userModel');

module.exports = {

	helloWorld: (req, res) => {
		res.send('hello Jobs');
	},

	createJob: (req, res) => {
		const newJob = {
			jobName: req.body.jobName,
			openings: req.body.openings,
			description: req.body.description,
			max_price: req.body.max_price,
			user_id: req.body.user_id,
			location_lat: req.body.location_lat,
			location_lng: req.body.location_lng,
			deadline: req.body.deadline,
		};

		function jobCreation() {
			Job.create(newJob).then((jobs) => {
				res.status(201).send(jobs);
			})
			.catch((error) => {
				res.status(400).send("Server Error Job Not Created");
			});
		}

		Category.findOne({ where: { name: req.body.category_id }
		}).then((cat) => {
			newJob.category_id = cat.dataValues.id;
			jobCreation();
		}).catch(error => res.status(400).send("Category does not Exist"));
	},	

	queryJobs: (req, res) => {
		Job.findAll({ where : {[req.query.field]:req.query.key} })
		.then((data) => {
			res.status(200).send(data);
		}).catch(error => res.status(400).send("Job Not Found"));
	},

	getAllJobs: (req, res) => {
		Job.findAll().then((jobs) => {
			res.status(200).send(jobs);
		}).catch(error => res.status(400).send("Sever Error"));
	},

};
