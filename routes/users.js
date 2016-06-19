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

  /* For all requests it's required that the user should be authenticated. */
  // .get('*', [sessionsHelper.authenticated, user.is('admin')], function (req, res, next) {
  .get('*', sessionsHelper.authenticated, function (req, res, next) {
    return next();
  })

  /* GET Users for list all users. */
  .get('/', usersController.index)

  /* GET User by ID for show the user. */
  .get('/:id', usersController.show)

  /* POST User for create a user. */
  .post('/', usersController.create)

  /* PUT User by ID for update the user. */
  .put('/:id', usersController.update)

  /* DELETE User by ID for remove the user. */
  .delete('/:id', usersController.remove);

module.exports = router;
