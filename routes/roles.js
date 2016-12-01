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

  /* REQUIRE Authenticate and authorizated to access roles resources. */
  // .all('/', [sessionsHelper.authenticated, user.is('admin')], function(req, res, next) {
  //   next();
  // })

  /* GET Roles for list all roles. */
  .get('/', rolesController.index)

  /* GET Role by ID for show the role. */
  .get('/:role_id', rolesController.show)

  /* POST Role for create a role. */
  .post('/', rolesController.create)

  /* PUT Role by ID for update the role. */
  .put('/:role_id', rolesController.update)

  /* DELETE Role by ID for remove the role. */
  .delete('/:role_id', rolesController.remove);

module.exports = router;
