// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * PASSPORT.JS SETTINGS
 */

"use strict";

// Required Libs
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var FacebookTokenStrategy = require('passport-facebook-token');

// Required models
var User = require('../models/user');

// Required utils
var settings = require('../config/settings');

// Serialize and deserialize user (use on database).
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });

// Setup work for the JWT passport strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = settings.jwt.jwtSecret;

// JWT Auth
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  
  // Find user by friendlyId on MongoDB
  return User.findOne({_id: jwt_payload._doc._id})
    .populate({path: 'roles', select: 'name'})
    // When promise is ready
    .then(function(user) {
      // returns error if user was not found
      if (!user) done(null, false);
      // returns json when find user
      return done(null, user);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case generic error
      return done(err, false);
    });

}));

// Facebook Oauth Token
passport.use(new FacebookTokenStrategy(settings.oauth.Facebook,
  function(accessToken, refreshToken, profile, done) {

  // prepare user object from profile
  var user = {
    id: profile._json.id,
    name: profile._json.name,
    email: profile._json.email,
    birthday: profile._json.birthday,
    gender: profile._json.gender,
    image: profile._json.picture.data.url,
    provider: 'Facebook',
    token: accessToken
  };
  // returns json when find user
  return done(null, user);

}));

module.exports = passport;
