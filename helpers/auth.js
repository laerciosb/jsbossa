// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * AUTHENTICATION HELPER
 */

"use strict";

// Required Libs
var passport = require('passport');

// Require valid local token authentication to pass
exports.authenticated = function(req, res) {
  return passport.authenticate('jwt', { session: false });
};

// Require valid facebook token authentication to pass
exports.facebook = function(req, res) {
  return passport.authenticate('facebook-token');
};
