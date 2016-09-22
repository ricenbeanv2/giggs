const Strategy = require('passport-facebook').Strategy;
const request = require('request');
const configAuth = require('./auth');
const User = require('../user/userModel');

let fb = {};

module.exports = (app, passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
  passport.use(new Strategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['emails', 'displayName']
  },
    (accessToken, refreshToken, profile, cb) => {
      fb = {
        accessToken,
        refreshToken,
        profile
      };
      User.findOne({
        where: {
          fb_id: profile.id
        }
      })
      .then(user => {
        if (user) {
          console.log("user found?");
          return cb(null, user);
        }
        console.log('peeking the profile', profile);
        const newUser = {
          fb_id: profile.id,
          fb_token: accessToken,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: null,
          username: null,
          phone: null
        };
        User.build(newUser).save()
        .then(result => {
          return cb(null, result);
        });
      });
      }
  ));

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

  app.get('/logout', (req, res) => {
    //logout first time why
    request
   .post({
      url: `https://graph.facebook.com/${fb.profile.id}/permissions`,
      formData: {
        method: 'DELETE',
        format: 'json',
        access_token: fb.accessToken
      }
      }, (err, httpResponse, body) => {
        if (err) {
          res.redirect('/signin');
        } else {
          res.redirect('/signup');
        }
      }
    );
  });
};
