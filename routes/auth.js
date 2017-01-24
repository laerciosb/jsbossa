// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * AUTHENTICATION ROUTES
 */

"use strict";

// Required libs
var express = require('express');
var router = express.Router();

// Required controllers
var authController = require('../controllers/auth');

// Required utils
var authHelper = require('../helpers/auth');

/*
 * Routes
 */

router

  /* POST User local authentication. */
  .post('/login', authController.login)

  /* GET Facebook authentication. */
  .get('/facebook', authHelper.facebook(), authController.oauth)

  /* POST User send email to recover password. */
  .post('/reset_password', authController.resetPassword)

  /* POST User send token received in email to create new password. */
  .post('/reset_password/:token', authController.setNewPassword);

module.exports = router;
