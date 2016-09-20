var User = require('./userModel.js');

module.exports = {

	helloWorld: function(req, res) {
		res.send('hello users');
	},

	createUser: function(req, res){
		var newUser = {
			username: req.body.username,
			password: req.body.password,
			name: req.body.name,
			email: req.body.email
		}
		//check if user exists
		User.build(newUser).save()
		.then(function(result){
			return res.status(200).send(newUser);
		}).catch(function(err){
			throw err;
		});

	},
	authUser: function(req,res){
		res.status(200).send('hi');
	},

	updateUser: function(req, res){

	}

};
