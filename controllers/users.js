// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * USERS CONTROLLER
 */

"use strict";

// Required models
var User = require('../models/user');

// Required utils
var errors = require('../helpers/errors');

// GET Users resource action
exports.index = function(req, res, next) {

  // Receive query
  var query = {};

  var role = req.query.role;
  if(role) query.role = role;

  // Find all users on MongoDB
  return User.find(query, function (err, users) {
    // returns in error case
    if (err) return errors.dbError(err, next);
    // returns json when find users
    res.json(users);
  })
    .populate({ path: 'roles', select: 'name' });

};

// GET User show resource action
exports.show = function(req, res, next) {

  // Receive param id
  var user_id = req.params.user_id;

  // Find user by id on MongoDB
  return User.findById(user_id, function (err, user) {
    // returns error if user was not found
    if (user === undefined || user === null)
      return errors.notFoundError('The user was not found', next);
    // returns in error case
    if (err) return errors.dbError(err, next);
    // returns json when find users
    res.json(user);
  })
    .populate({ path: 'roles', select: 'name' });

};

// POST User create resource action
exports.create = function(req, res, next) {

  // Receive body user
  var user = new User(req.body);
  
  // Import model to find video this description
  var Role = require('../models/role');

  // Find Role by id on MongoDB
  return new Promise(function(resolve) {
    // Here the user created has role 'user' and 'admin'
    // Role.getProtectedRoles(function (err, roles) {
    //   // returns error if roles was not found
    //   if (roles === undefined || roles === null)
    //     return errors.notFoundError('The roles was not found', next);
    //   // returns in error case
    //   if (err) return errors.dbError(err, next);

    //   user.roles = roles;
    //   resolve(user);

    // });

    // All user created should has role 'user'
    Role.findOne({ 'name': 'user' }, function (err, role) {
      // returns error if role was not found
      if (role === undefined || role === null)
        return errors.notFoundError('The role was not found', next);
      // returns in error case
      if (err) return errors.dbError(err, next);

      user.roles.push(role);
      resolve(user);

    });

  })
    // When promise is ready
    .then(function(user) {
      // Save user on MongoDB
      user.save(function(err, user) {
        // returns in error case
        if (err) return errors.dbError(err, next);
        // returns json when save user
        res.json(user);
      });
  });

};

// PUT User update resource action
exports.update = function(req, res, next) {

  // Receive param id
  var user_id = req.params.user_id;

  // Find user by id
  return User.findById(user_id, function (err, user) {
    // returns error if user was not found
    if (user === undefined || user === null)
      return errors.notFoundError('The user was not found', next);
    // returns in error case
    if (err) return errors.dbError(err, next);

    // Receive body role
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : user.password;

    // Update user on MongoDB
    user.save(function (err, user) {
      // returns in error case
      if (err) return errors.dbError(err, next);
      // returns json when update user
      res.json(user);
    });

  });

};

// DELETE User remove resource action
exports.remove = function(req, res, next) {

  // Receive param id
  var user_id = req.params.user_id;

  // Find user by id
  return User.findById(user_id, function (err, user) {
    // returns error if user was not found
    if (user === undefined || user === null)
      return errors.notFoundError('The user was not found', next);
    // returns in error case
    if (err) return errors.dbError(err, next);

    // Remove user on MongoDB
    user.remove(function (err) {
      // returns in error case
      if (err) return errors.dbError(err, next);
      // returns json when remove user
      res.json({message : 'deleted', item : user});
    });

  });

};