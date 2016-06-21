// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Connect Roles Settings
 */

"use strict";

// Required Lib
var ConnectRoles = require('connect-roles');
var userHelper = require('../helpers/users');

var user = new ConnectRoles({
  failureHandler: function (req, res, action) {
    // optional function to customise code that runs when
    // user fails authorization
    var accept = req.headers.accept || '';
    res.status(403);
    if (~accept.indexOf('html')) {
      res.render('access-denied', {action: action});
    } else {
      res.send('Access Denied - You don\'t have permission to: ' + action);
    }
  }
});

// Admin users can access all pages
user.use(function (req) {
  if(req.isAuthenticated()){
    if(userHelper.isRole(req.user, ['admin'])) return true;
  }
});

// Define methods to validate user roles
user.use('admin', function (req) {
  return userHelper.isRole(req.user, ['admin']);
});

user.use('expert', function (req) {
  return userHelper.isRole(req.user, ['expert']);
});

user.use('user', function (req) {
  return userHelper.isRole(req.user, ['user']);
});

// Define methods to validate action roles
user.use('access users index', function (req) {
  console.log("access users index");
  return userHelper.isRole(req.user, ['user', 'expert']);
});

user.use('access users show', function (req) {
  return userHelper.isRole(req.user, ['expert']);
});

user.use('access users edit', function (req) {
  return userHelper.isMe(req.user, req.params.id);
});

module.exports = user;