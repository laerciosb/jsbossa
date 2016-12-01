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
  // .get('/', [sessionsHelper.authenticated, user.can('access users index')], usersController.index)
  .get('/', usersController.index)

  /* GET User by ID for show the user. */
  // .get('/:user_id', [sessionsHelper.authenticated, user.can('access users show')], usersController.show)
  .get('/:user_id', usersController.show)

  /* POST User for create a user. */
  .post('/', usersController.create)

  /* PUT User by ID for update the user. */
  // .put('/:user_id', [sessionsHelper.authenticated, user.is('expert')], usersController.update)
  .put('/:user_id', usersController.update)

  /* DELETE User by ID for remove the user. */
  // .delete('/:user_id', [sessionsHelper.authenticated, user.is('expert')], usersController.remove);
  .delete('/:user_id', usersController.remove);

module.exports = router;
