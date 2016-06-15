// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Passport.js Settings
 */

"use strict";

// Required Libs
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Required user model to LocalStrategy
var User = require('../models/user');
var bcryptjs = require('bcryptjs');

// Serialize and deserialize user (use on database).
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });

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