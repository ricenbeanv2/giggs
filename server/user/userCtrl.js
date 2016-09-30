const User = require('./userModel');

module.exports = {
	signup: (req, res) => {
		const newUser = {
			username: req.body.username,
			password: req.body.password,
			phone: req.body.phone,
			name: req.body.name,
			email: req.body.email
		};

		User.create(newUser)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
	},

	signin: (req, res) => {
		const userInput = {
			username: req.query.username,
			password: req.query.password
		};
		User.auth(userInput)
		.then((data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(200).send('invalid password');
			}
		})
		.catch(err => {
			res.status(400).send(err);
		});
	},

	getUserInfo: (req, res) => {
		//return user profile
		User.getProfile(req.params.id)
		.then((user) => {
			if (user) {
				const userProfile = {
					username: user.username,
					name: user.name,
					phone: user.phone,
					email: user.email
				};
				res.status(200).json(userProfile);
			} else {
				res.status(200).send('unable to fetch user information');
			}
		})
		.catch(err => {
			res.status(400).send(err);
		});
		//return job history
		//retun apply history
	},
	updateUser: (req, res) => {
		const fields = req.body.fields;
		const userID = req.body.id;
		console.log('fields inside update', fields);
		delete fields.id;
		User.updateInfo(userID, fields)
		.then(result => {
			res.status(200).send(result);
		})
		.catch(err => {
			res.status(400).send(err);
		});
	},

	getUsers: (req, res) => {
		console.log('query: ', req.query);
		User.findAll({ where: { [req.query.field]: JSON.parse(req.query.key) } })
			.then(data => {
				res.status(200).send(data);
			})
			.catch(err => {
				res.status(400).send(err);
			});
	}
};
