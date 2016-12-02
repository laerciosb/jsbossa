// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * AUTHENTICATION HELPER
 */

"use strict";

// Required Libs
var passport = require('passport');

// Require valid token authentication to pass
exports.authenticated = function(req, res) {
  return passport.authenticate('jwt', { session: false });
};
