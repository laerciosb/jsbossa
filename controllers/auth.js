// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * AUTHENTICATION CONTROLLER
 */

"use strict";

// Required Libs
var jwt = require('jsonwebtoken');

// Required models
var User = require('../models/user');
var Role = require('../models/role');

// Required utils
var settings = require('../config/settings');
var errors = require('../helpers/errors');

// POST Request to local authentication action
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

// POST Request to oauth action
exports.oauth = function (req, res, next) {

  User.findOne({email: req.user.email}, function(err, user) {
    // returns in error case
    if (err) return errors.dbError(err, next);

    new Promise(function(resolve) {
      // create new if user was not found
      if (user === undefined || user === null) {
        
        var user = new User(req.user);

        // Find Role by id on MongoDB
        return new Promise(function(resolve) {
          // All user created should has role 'user'
          Role.findOne({ 'name': 'user' }, function (err, role) {
            // returns error if role was not found
            if (role === undefined || role === null)
              return errors.notFoundError('The role was not found', next);
            // returns in error case
            if (err) return errors.dbError(err, next);

            user.roles.push(role);
            resolve(user);

          });

        })
          // When promise is ready
          .then(function(user) {
            // Save user on MongoDB
            user.save(function(err, user) {
              // returns in error case
              if (err) return errors.dbError(err, next);
              
              resolve(user);
            });
          });

      } else resolve(user);

    })
      .then(function(user) {
        // Create token to user if no error was thrown
        var token = jwt.sign(user, settings.jwt.jwtSecret, {
          expiresIn: settings.jwt.expiresIn
        });
        res.json({ token: 'JWT ' + token });

      });

  });

};
