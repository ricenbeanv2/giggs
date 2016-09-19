var User = require('./userModel.js');

module.exports = {

	helloWorld: function(req, res) {
		res.send('hello users');
	},

	createUser: function(req, res){
		const newUser = {
			username: req.body.name,
			password: req.body.password,
			email: req.body.email
		}

		User.create(newUser)
		//check if user exist
		//hash password
	},

	checkUser: function(req, res){
		const userInput = {
			name: req.body.name,
			password: req.body.password,
			email: req.body.email
		}
		//if username exsit
		//compare bcrypt password


	},

	updateUser: function(req, res){

	}

};
