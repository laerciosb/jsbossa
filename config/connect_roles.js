// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * CONNECT ROLES
 */

"use strict";

// Required Libs
var ConnectRoles = require('connect-roles');

// Required utils
var userHelper = require('../helpers/users');
var authHelper = require('../helpers/auth');
var errorsHelper = require('../helpers/errors');

// Create new instance of ConnectRoles and define action when unauthorized
var user = new ConnectRoles({
  failureHandler: function(req, res, action) {
    // optional function to customise code that runs when
    // user fails authorization
    var accept = req.headers.accept || '';
    var err = errorsHelper.notAuthorizedError(t('Access.Unauthorized', action));
    
    res.status(err.status);
    if (~accept.indexOf('html')) res.render('access-denied', {action: action});
    else {
      res.json({
        error: {
          message: err.message,
          status: err.status,
          stack: err.stack
        }
      });
    }

  }

});

/*
 * Admin users can access all pages
 */

user.use(function(req) {
  if(userHelper.isRole(req.user, ['admin'])) return true;
});

/*
 * Define methods to validate user roles
 */

user.use('admin', function(req) {
  return userHelper.isRole(req.user, ['admin']);
});

user.use('expert', function(req) {
  return userHelper.isRole(req.user, ['expert']);
});

user.use('moderator', function(req) {
  return userHelper.isRole(req.user, ['moderator']);
});

user.use('user', function(req) {
  return userHelper.isRole(req.user, ['user']);
});

/*
 * Define methods to validate action roles
 */
 
user.use('access users index', function(req) {
  return userHelper.isRole(req.user, ['expert']);
});

user.use('access users show', function(req) {
  return userHelper.isRole(req.user, ['expert', 'moderator']) || 
    userHelper.isMe(req.user, req.params.user_id);
});

user.use('access users edit', function(req) {
  return userHelper.isRole(req.user, ['expert']) || 
    userHelper.isMe(req.user, req.params.user_id);
});

module.exports = user;
