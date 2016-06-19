// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Sessions Helper
 */

"use strict";

// Require authentication for pass
exports.authenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  // res.send(!!req.isAuthenticated());
  // req.flash('error', 'Unauthorized');
  res.redirect(401,'/'); // Unauthorized
};


