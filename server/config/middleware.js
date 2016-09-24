const User = require('../user/userModel');

exports.checkUsername = (req, res, next) => {
  if (!req.body.username) {
    next();
  } else {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (user) {
        res.status(200).send('username already registered');
      }
      if (!user) {
        next();
      }
    });
  }
};

exports.checkEmail = (req, res, next) => {
  if (!req.body.email) {
    next();
  } else {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (user) {
        res.status(200).send('email already registered');
      }
      if (!user) {
        next();
      }
    });
  }
};
