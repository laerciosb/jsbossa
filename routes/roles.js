// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * ROLES ROUTES
 */

"use strict";

// Required libs
var express = require('express');
var router = express.Router();

// Required controllers
var rolesController = require('../controllers/roles');

// Required utils
var authHelper = require('../helpers/auth');
var user = require('../config/connect_roles');

/*
 * Routes
 */

router

  /* REQUIRE Authenticate and authorizated to access roles resources. */
  .all('/', [authHelper.authenticated(), user.is('admin')], function(req, res, next) {
    next();
  })

  /* GET Roles for list all roles. */
  .get('/', rolesController.index)

  /* GET Role by ID for show the role. */
  .get('/:role_id', rolesController.show)

  /* GET Role Users by ID for show the users from role. */
  .get('/:role_id/users', rolesController.users)

  /* POST Role for create a role. */
  .post('/', rolesController.create)

  /* PUT Role by ID for update the role. */
  .put('/:role_id', rolesController.update)

  /* DELETE Role by ID for remove the role. */
  .delete('/:role_id', rolesController.remove);

module.exports = router;
