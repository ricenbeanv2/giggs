const User = require('../user/userModel');
const jwt = require('jwt-simple');

module.exports = (req, res, next) => {
  const token = (req.body && req.body.access_token)
  || (req.query && req.query.access_token)
  || req.headers['x-access-token'];

  if (!token) {
    res.status(400).send('no token');
  }
  if (token) {
    try {
      const decoded = jwt.decode(token, 'appsecrethere');
      if (decoded.exp <= Date.now()) {
        res.status(400).send('Access token expired');
      }
      User.findById(decoded.iss)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        next(err);
      });
    } catch (err) {
      return next(err);
    }
  }
};
