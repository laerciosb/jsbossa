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

/*
 * Routes
 */

router

  /* POST User authentication login. */
  .post('/login', authController.login);

module.exports = router;
