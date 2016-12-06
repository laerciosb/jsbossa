// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * AUTHENTICATION ROUTES
 */

"use strict";

// Required libs
var express = require('express');
var router = express.Router();
var passport = require('passport');

// Required controllers
var authController = require('../controllers/auth');

/*
 * Routes
 */

router

  /* POST User local authentication. */
  .post('/login', authController.login)

  /* GET Facebook authentication. */
  .get('/facebook', passport.authenticate('facebook-token'), authController.oauth);

module.exports = router;
