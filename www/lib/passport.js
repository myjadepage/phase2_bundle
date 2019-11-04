var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField: 'phone',
    passwordField: 'resAuthen',
    passReqToCallback: true
  }, 
  function (req, phone, resAuthen, done) {
        if(phone && (req.body.resAuthen == resAuthen)) {
          return done(null, {
              user_id: phone
            });
        } else {
          return done(false, null)
        }
  }));

passport.serializeUser(function (user, done) {
  done(null, user)
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;