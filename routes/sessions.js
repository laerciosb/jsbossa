// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

var express = require('express');
var router = express.Router();
var sessionsController = require('../controllers/sessions');

/*
 SESSIONS ROUTES
 */

router

  /* GET to Logout session account. */
  .get('/logout', sessionsController.logout)

  /* POST User authentication status. */
  .post('/login', sessionsController.login);

module.exports = router;