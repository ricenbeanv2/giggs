const User = require('./userModel');
const bcrypt = require('bcrypt');

module.exports = {
	signup: (req, res) => {
		const newUser = {
			username: req.body.username,
			password: req.body.password,
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
		.then((valid) => {
			if (valid) {
				res.status(200).send('login sucess');
			} else {
				res.status(200).send('invalid password');
			}
		});
	}
};
