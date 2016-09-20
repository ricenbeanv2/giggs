const Job = require('./jobModel');

module.exports = {

	helloWorld: (req, res) => {
		res.send('hello Jobs');
	},

	createJob: (req, res) => {
		/*var newJob = {
			jobName: req.body.username,
			openings: req.body.openings,
			description: req.body.description,
			max_price: req.body.max_price,
			location_lat: req.body.location_lat,
			location_lng: req.body.location_lng,
			deadline: req.body.deadline,
		}*/
		Job.create(req.body).then(function(jobs) { // Notice: There are no arguments here, as of right now you'll have to...
				console.log('check database for new job');
				res.send(jobs);
			})
			.catch(function(error) {
				console.log(error); // ... in order to get the array of user objects
				res.send(error);
			});
	},

	getAllJobs: (req, res) => {
		Job.findAll().then(function(data) {
			res.send(data);
		})
		.catch(function(error) {
			res.send(error);
		});
	},
	
};
