module.exports = {
  facebookAuth: {
    clientID: '977591632351488',
    clientSecret: '8acbe3a323bfee19f552128378687982',
    callbackURL: '/auth/facebook/callback'
  },
  jwt: {
    secret: process.env.APP_SECRET
  }
};
