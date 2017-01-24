// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * AUTHENTICATION CONTROLLER
 */

"use strict";

// Required Libs
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

// Required models
var User = require('../models/user');

// Required utils
var settings = require('../config/settings');
var mailerHelper = require('../helpers/mailer');
var errorsHelper = require('../helpers/errors');

// POST Auth action to local authentication
exports.login = function(req, res, next) {
  // Find user by friendlyId on MongoDB
  return User.findOne({email: req.body.email})
    // When promise is ready
    .then(function(user) {
      // returns error if user was not found
      if (!user) throw errorsHelper.notFoundError(t('User.NotFound', req.body.email));

      // Check if password matches
      return user.comparePassword(req.body.password)
        .then(function(success) {
          // returns error if authentication failed
          if(!success) throw errorsHelper.unprocessableError(t('User.PasswordFail'));
         
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, settings.jwt.jwtSecret, {
            expiresIn: settings.jwt.expiresIn
          });
          // returns json with user token
          return res.json({ token: 'JWT ' + token });
        });
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// POST Auth action to authentication from oauth
exports.oauth = function(req, res, next) {
  // Receive req.user
  var user = new User(req.user);
  
  // Save user with role 'user', case exists some user on MongoDB
  return user.findOrCreate()
    // When promise is ready
    .then(function(user) {
      // Create token to user if no error was thrown
      var token = jwt.sign(user, settings.jwt.jwtSecret, {
        expiresIn: settings.jwt.expiresIn
      });
      // returns json with user token
      res.json({ token: 'JWT ' + token });
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// POST Auth action to request reset password
exports.resetPassword = function(req, res, next) {
  var token = null;

  // Generate hash token to reset password
  return Promise.resolve(crypto.randomBytes(20))
    // When promise is ready
    .then(function(buf) {
      // get token
      token = buf.toString('hex');

      // Find user by friendlyId on MongoDB
      return User.findOne({email: req.body.email})
    })
    // When promise is ready
    .then(function(user) {
      // returns error if user was not found
      if (!user) throw errorsHelper.notFoundError(t('User.NotFound', req.body.email));
      
      // Add data user
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      // Update user on MongoDB
      return user.save();
    })
    // When promise is ready
    .then(function(user) {
      var mailOptions = {
        emails: user.email,
        title: t('Mailer.Options.ResetPassword.Title'),
        subject: t('Mailer.Options.ResetPassword.Subject'),
        templatePath: './public/reset_password.pug',
        variables: {
          name: user.name,
          linkToRenewPassword: settings.mailer.route + user.resetPasswordToken
        }
      };

      return mailerHelper.renderAndSendMail(mailOptions)
        // When promise is ready
        .then(function() {
          return res.json({
            message: t('Mailer.ResetPasswordSuccess', user.email)
          });
        });
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// POST Auth action to create new password from token
exports.setNewPassword = function(req, res, next) {
  return User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {$gt: Date.now()}
  })
    // When promise is ready
    .then(function(user) {
      // returns error if user was not found
      if (!user) throw errorsHelper.notFoundError(t('Mailer.ResetPasswordExpires'));

      // Add data user
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      // Update user on MongoDB
      return user.save();
    })
    // When promise is ready
    .then(function(user) {
      var mailOptions = {
        emails: user.email,
        title: t('Mailer.Options.NewPassword.Title'),
        subject: t('Mailer.Options.NewPassword.Subject'),
        templatePath: './public/confirmation_reset_password.pug',
        variables: {
          name: user.name,
          email: user.email
        }
      };

      return mailerHelper.renderAndSendMail(mailOptions)
        // When promise is ready
        .then(function() {
          return res.json({
            message: t('Mailer.NewPasswordSuccess', user.email)
          });
        });
        
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};