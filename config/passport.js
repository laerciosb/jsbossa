// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * PASSPORT.JS SETTINGS
 */

"use strict";

// Required Libs
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var bcryptjs = require('bcryptjs');
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
  User.findOne({_id: jwt_payload._doc._id}, function(err, user) {
    if (err) return done(err, false);

    if (!user)
      done(null, false);

    return done(null, user);
  })
    .populate('roles', 'name');
}));

// Facebook Oauth Token
passport.use(new FacebookTokenStrategy(settings.oauth.Facebook,
  function(accessToken, refreshToken, profile, done) {

  var user = {
    id: profile._json.id,
    name: profile._json.name,
    image: profile._json.picture.data.url,
    email: profile._json.email,
    birthday: profile._json.birthday,
    currency: profile._json.currency,
    hometown: profile._json.hometown,
    profileURL: profile._json.link,
    gender: profile._json.gender,
    provider: 'Facebook',
    token: accessToken
  };

  return done(null, user);
}));

module.exports = passport;
