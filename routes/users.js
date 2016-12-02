// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * USERS ROUTES
 */

"use strict";

// Required libs
var express = require('express');
var router = express.Router();

// Required controllers
var usersController = require('../controllers/users');

// Required utils
var authHelper = require('../helpers/auth');
var user = require('../config/connect_roles');

/*
 * Routes
 */

router

  /* GET Users for list all users. */
  .get('/', [authHelper.authenticated(), user.can('access users index')], usersController.index)

  /* GET User by ID for show the user. */
  .get('/:user_id', 
    [authHelper.authenticated(), user.can('access users show')], usersController.show)

  /* POST User for create a user. */
  .post('/', usersController.create)

  /* PUT User by ID for update the user. */
  .put('/:user_id', 
    [authHelper.authenticated(), user.can('access users edit')], usersController.update)

  /* DELETE User by ID for remove the user. */
  .delete('/:user_id', [authHelper.authenticated(), user.is('admin')], usersController.remove);

module.exports = router;
