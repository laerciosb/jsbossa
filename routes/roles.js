// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

var express = require('express');
var router = express.Router();
var rolesController = require('../controllers/roles');
var sessionsHelper = require('../helpers/sessions');
var user = require('../config/connect_roles');

/*
 ROLES ROUTES
 */

router

  /* GET Roles for list all roles. */
  .get('/', [sessionsHelper.authenticated, user.is('admin')], rolesController.index)

  /* GET Role by ID for show the role. */
  .get('/:id', [sessionsHelper.authenticated, user.is('admin')], rolesController.show)

  /* POST Role for create a role. */
  .post('/', [sessionsHelper.authenticated, user.is('admin')], rolesController.create)

  /* PUT Role by ID for update the role. */
  .put('/:id', [sessionsHelper.authenticated, user.is('admin')], rolesController.update)

  /* DELETE Role by ID for remove the role. */
  .delete('/:id', [sessionsHelper.authenticated, user.is('admin')], rolesController.remove);

module.exports = router;
