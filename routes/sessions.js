// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

var express = require('express');
var router = express.Router();
var sessionsController = require('../controllers/sessions');

/*
 AUTHENTICATIONS ROUTES TO ANGULARJS CONSUME.
 */

router

// AUTHENTICATIONS ROUTES

/* GET OAuth Facebook authentication. */
  .get('/facebook', sessionsController.facebook)

  /* GET OAuth callback for Facebook authentication. */
  .get('/facebook/callback', sessionsController.callback_facebook)

  /* GET OAuth Google authentication. */
  .get('/google', sessionsController.google)

  /* GET OAuth callback for Google authentication. */
  .get('/google/callback', sessionsController.callback_google)

  /* GET User authentication. */
  .get('/current_user', sessionsController.current_user)

  /* GET User authentication status. */
  .get('/loggedin', sessionsController.loggedin)

  /* GET to Logout session account. */
  .get('/logout', sessionsController.logout)

  /* POST User authentication status. */
  .post('/login', sessionsController.login);

module.exports = router;