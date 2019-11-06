var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField: 'sendPhone',
    passwordField: 'resAuthen',
    passReqToCallback: true
  }, function (req, sendPhone, resAuthen, done) {
        if(sendPhone && resAuthen) {
          return done(null, {
              user_id: sendPhone,
              user_name : req.body.sendName
            });
        } else {
          return done(false, null)
        }
  }));

passport.serializeUser(function (user, done) {
  done(null, user.user_name)
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;