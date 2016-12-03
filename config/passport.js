// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Passport.js Settings
 */

"use strict";

// Required Libs
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var bcryptjs = require('bcryptjs');

// Required models
var User = require('../models/user');

// Required utils
var settings = require('../config/settings');

// Setup work for the JWT passport strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = settings.jwt.jwtSecret;

// JWT Auth
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({_id: jwt_payload._doc._id}, function(err, user) {
    if (err) return done(err, false);

    if (!user)
      done(null, false);

    return done(null, user);
  })
    .populate('roles', 'name');
}));

module.exports = passport;
