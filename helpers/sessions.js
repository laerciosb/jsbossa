// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Sessions Helpers
 */

"use strict";

// Route middleware to ensure user is logged in
exports.requireAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  // res.send(!!req.isAuthenticated());
  // req.flash('error', 'Unauthorized');
  res.redirect(401,'/login'); // Unauthorized
};


