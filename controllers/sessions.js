// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Sessions Controller
 */

"use strict";

// Required Lib
var passport = require('../config/passport');

// GET Facebook resource action
exports.facebook = passport.authenticate('facebook');

// GET Facebook callback action
exports.callback_facebook = passport.authenticate('facebook', {
  successRedirect : '/',
  failureRedirect : '/login'
});

// GET Google resource action
exports.google = passport.authenticate('google', {scope: ['profile', 'email']});

// GET Google callback action
exports.callback_google = passport.authenticate('google', {
  successRedirect : '/',
  failureRedirect : '/login'
});

// GET Sign out action
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

// POST Google callback action
exports.login = passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/'
});