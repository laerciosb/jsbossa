// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Sessions Controller
 */

"use strict";

// Required Lib
var passport = require('../config/passport');

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