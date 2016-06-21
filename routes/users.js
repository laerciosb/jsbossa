// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var sessionsHelper = require('../helpers/sessions');
var user = require('../config/connect_roles');

/*
 USERS ROUTES
 */

router

  /* GET Users for list all users. */
  .get('/', [sessionsHelper.authenticated, user.can('access users index')], usersController.index)

  /* GET User by ID for show the user. */
  .get('/:id', [sessionsHelper.authenticated, user.can('access users show')], usersController.show)

  /* POST User for create a user. */
  .post('/', usersController.create)

  /* PUT User by ID for update the user. */
  .put('/:id', [sessionsHelper.authenticated, user.can('access users edit')], usersController.update)

  /* DELETE User by ID for remove the user. */
  .delete('/:id', [sessionsHelper.authenticated, user.is('expert')], usersController.remove);

module.exports = router;
