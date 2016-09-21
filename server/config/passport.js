const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../user/userModel');
const configAuth = require('./auth');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['emails', 'displayName']
  },
  (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({
        where: {
          fb_id: profile.id
        }
      })
      .then(user => {
        if (user) {
          //found user, return that user
          return done(null, user);
        }
          //user does not exists, create new user
          const newUser = {
            fb_id: profile.id,
            fb_token: token,
            name: profile.displayName,
            email: profile.emails[0].value
          };
          User.build(newUser).save()
          .then(result => {
            return done(null, result);
          });
      });
    });
  }
)
);
};
