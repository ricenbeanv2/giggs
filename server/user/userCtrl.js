const User = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');

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
			console.log('user_id', user.id);
			const token = jwt.encode({
				iss: user.id,
				exp: moment().add('days', 7).valueOf()
			}, 'appsecrethere');

			bcrypt.hash(newUser.password, 10, (err, hash) => {
				user.update({ password: hash });
				res.json({
					token: token,
					expires: moment().add('days', 7).valueOf(),
					user: user.toJSON()
				});
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
