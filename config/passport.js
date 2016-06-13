// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Passport.js Settings
 */

// Required Libs
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// OAuth Settings
// var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
// var oauthConfig = require('./oauth');

// Serialize and deserialize user (use on database).
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });

// // Facebook Auth
// passport.use(new FacebookStrategy(oauthConfig.Facebook,
//   function (accessToken, refreshToken, profile, done) {
//     // console.log(profile);
//
//     var user = {
//       id: profile.id,
//       name: profile.displayName,
//       email: profile.emails[0].value,
//       profileURL: profile.profileUrl,
//       provider: profile.provider,
//       token: accessToken,
//       auth: 'Facebook'
//     };
//
//     // console.log(user);
//     return done(null, user);
//   }
// ));
//
// // Google Auth
// passport.use(new GoogleStrategy(oauthConfig.Google,
//   function(accessToken, refreshToken, profile, done) {
//     // console.log(profile);
//
//     var user = {
//       id: profile.id,
//       name: profile.displayName,
//       email: profile.emails[0].value,
//       profileURL: 'http://plus.google.com/',
//       provider: profile.provider,
//       token: accessToken,
//       auth: 'Google'
//     };
//
//     // console.log(user);
//     return done(null, user);
//   }
// ));

// Required user model to LocalStrategy
var User = require('../models/user');
var bcryptjs = require('bcryptjs');

// Local Auth
passport.use(new LocalStrategy ({ usernameField: 'email',
  passwordField: 'password' }, function (username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) return done(err);

      if (!user || !bcryptjs.compareSync(password, user.password))
        return done(null, false, 'Usuário ou senha inválido.');

      return done(null, user);
    });
}));

module.exports = passport;