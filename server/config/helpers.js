const User = require('../user/userCtrl');
const jwt = require('jwt-simple');

module.exports = (req, res, next) => {
  const token = (req.body && req.body.access_token)
  || (req.query && req.query.access_token)
  || req.headers['x-access-token'];

  if (token) {
    try {
      var decoded = jwt.decode(token, 'appsecrethere');
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};
