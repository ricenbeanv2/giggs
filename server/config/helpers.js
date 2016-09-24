const User = require('../user/userModel');
const jwt = require('jwt-simple');

module.exports = (req, res, next) => {
  //check if token exists in req.body, req.query or req.headers
  const token = (req.body && req.body.access_token)
  || (req.query && req.query.access_token)
  || req.headers['x-access-token'];

  if (!token) {
    //if no token found, redirect to 404 page
    res.status(404).send('no token');
  }
  if (token) {
    try {
      //decode token
      const decoded = jwt.decode(token, 'appsecrethere');
      //check if token expire: client should remove token from local storage
      if (decoded.exp <= Date.now()) {
        res.status(400).send('Access token expired');
      }
      //check if the user id in decoded token exists
      User.findById(decoded.iss)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        //if error in finding user, return invalid user
        res.status(404).send('user does not exists');
      });
    } catch (err) {
      //if fail to decode token, send invalid token
      res.status(404).send('invalid token');
    }
  }
};
