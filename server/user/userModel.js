const Sequelize = require('sequelize');
const connection = require('../db/connection');
const jwt = require('jwt-simple');
const moment = require('moment');
const bcrypt = require('bcrypt');

const User = connection.define('Users', {
	username: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		isEmail: true,
		allowNull: true
	},
	phone: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	fb_id: {
		type: Sequelize.STRING,
		allownull: true
	},
	fb_token: {
		type: Sequelize.STRING,
		allownull: true
	}
}, {
	freezeTableName: true,
});

User.create = userObj => {
	return new Promise((resolve, reject) => {
		User.build(userObj).save()
		.then(user => {
			const token = jwt.encode({
				iss: user.id,
				exp: moment().add('days', 7).valueOf()
			}, 'appsecrethere');
			bcrypt.hash(userObj.password, 10, (err, hash) => {
				user.update({ password: hash })
				.then(() => {
					resolve({
						token,
						expires: moment().add('days', 7).valueOf(),
						user: {
							username: user.username,
							userid: user.id
						}
					});
				});
			});
		})
		.catch(err => {
			reject(err);
		});
	});
};
User.auth = userInput => {
	return new Promise((resolve, reject) => {
		User.findOne({
			where: {
				username: userInput.username
			}
		})
		.then(user => {
			bcrypt.compare(userInput.password, user.password, (err, valid) => {
				if (err) {
					throw err;
				}
				resolve(valid);
			});
		})
		.catch(err => {
			reject(err);
		});
	});
};
module.exports = User;
