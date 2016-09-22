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
		});
		//return job history
		//retun apply history
	},
	updateUser: (req, res) => {
		User.updateInfo(req.body.id, req.body.fields)
		.then(result => {
			res.status(200).send(result);
		});
	}


};
