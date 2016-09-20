var User = require('./userModel.js');
var bcrypt = require('bcrypt');

module.exports = {

	createUser: (req, res) => {
		const newUser = {
			username: req.body.username,
			password: req.body.password,
			name: req.body.name,
			email: req.body.email
		};
		//check if user exists
		User.build(newUser).save()
		.then(user => {
			bcrypt.hash(newUser.password, 10, (err, hash) => {
				user.update({ password: hash });
				res.status(200).send('user added!');
			});
		})
		.catch(err => {
			throw err;
		});
	},

	authUser: (req, res) => {
		const userInput = {
			username: req.query.username,
			password: req.query.password
		};
		User.findOne({ where: { username: userInput.username } })
		.then(user => {
			bcrypt.compare(userInput.password, user.password, (err, valid) => {
				if (err) {
					throw err;
				}
				res.status(200).send(valid);
			});
		});
	}

};
