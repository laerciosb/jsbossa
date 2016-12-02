// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * AUTHENTICATION CONTROLLER
 */

"use strict";

// Required Libs
var jwt = require('jsonwebtoken');

// Required models
var User = require('../models/user');

// Required utils
var passport = require('../config/passport');
var settings = require('../config/settings');
var errors = require('../helpers/errors');

// POST Request to login action
exports.login = function(req, res, next) {

  User.findOne({email: req.body.email}, function(err, user) {
    // returns error if user was not found
    if (user === undefined || user === null)
      return errors.notFoundError('The user was not found', next);
    // returns in error case
    if (err) return errors.dbError(err, next);

    // Check if password matches
    user.comparePassword(req.body.password, function(err, isMatch) {
      // returns error if authentication failed
      if (err || !isMatch)
        return errors.unprocessableError('Authentication failed. Passwords did not match.', next);

      // Create token if the password matched and no error was thrown
      var token = jwt.sign(user, settings.jwt.jwtSecret, {
        expiresIn: settings.jwt.expiresIn
      });
      res.json({ token: 'JWT ' + token });

    });

  });

};
