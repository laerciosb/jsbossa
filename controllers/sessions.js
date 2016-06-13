// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Authentications Controller
 */

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

// GET User authentication
exports.current_user = function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
};

// GET User authentication status
exports.loggedin = function(req, res) {
  res.send(!!req.isAuthenticated());
};

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