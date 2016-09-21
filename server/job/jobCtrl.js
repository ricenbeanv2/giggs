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
			location_lat: req.body.location_lat,
			location_lng: req.body.location_lng,
			deadline: req.body.deadline,
		};

		function jobQuery() {
			if (!newJob.user_id || !newJob.category_id) {
				return;
			}
			Job.create(newJob).then((jobs) => {
				res.send(jobs);
			})
			.catch((error) => {
				console.log(error);
				res.send(error);
			});
		}

		Category.findOne({ where: { name: req.body.category_id }
		}).then((cat) => {
			newJob.category_id = cat.dataValues.id;
			jobQuery();
		}).catch(error => res.send(error));

		Users.findOne({ where: { username: req.body.user_id }
		}).then((user) => {
			newJob.user_id = user.dataValues.id;
			jobQuery();
		}).catch(error => res.send(error));
	},

	getAllJobs: (req, res) => {
		Job.findAll().then((data) => {
			res.send(data);
		})
		.catch((error) => {
			res.send(error);
		});
	},

};
