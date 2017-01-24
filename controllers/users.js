// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * USERS CONTROLLER
 */

"use strict";

// Required models
var User = require('../models/user');

// Required utils
var errorsHelper = require('../helpers/errors');
var usersHelper = require('../helpers/users');
var settings = require('../config/settings');

// Required locals
var pagination = ['limit', 'offset', 'page', 'sort'];

// GET Users resource action
exports.index = function(req, res, next) {
  // Initialize variables
  var dateRegex = /^\d{4}\-\d{2}\-\d{2}$/;
  var oneDay = 86400000;
  var optsPagination = {};
  var queries = {};
  queries.birthday = {};

  // Fills variables if exists
  for (var i in req.query) {
    if (pagination.includes(i)) {
      optsPagination[i] = req.query[i].toLowerCase();
      if (i === 'sort') optsPagination[i] = {created_at: req.query[i]};
    } else {
      if (!dateRegex.test(req.query[i])) queries[i] = req.query[i].toLowerCase();
      if (i === 'name') queries[i] = {$regex: '.*' + req.query[i] + '.*', $options: 'i'};
      if (i === 'image') queries[i] = {$exists: (req.query[i] === 'true' ? true : false)};
      if (i === 'bn') queries.birthday.$gte = Date.parse(req.query.bn);
      if (i === 'bx') queries.birthday.$lt = Date.parse(req.query.bx) + oneDay;
      if (i === 'be') queries.birthday = {$gte: Date.parse(req.query.be), 
        $lt: Date.parse(req.query.be) + oneDay};
    }
  }
  // Remove birthday property if not filled
  if (Object.getOwnPropertyNames(queries.birthday).length === 0) delete queries.birthday;
  // Find all users on MongoDB
  // return User.find(queries, 'roles', {populate: 'roles', limit: 1, sort: {created_at: -1}})
  return User.paginate(queries, optsPagination)
    // .populate({path: 'roles', select: 'name', match: {name: 'admin'}})
    // .populate({path: 'roles', select: 'name'})
    // When promise is ready
    .then(function(users) {
      // for(var i in users) if(users[i].roles.length === 0) users.splice(i, 1);
      // returns json when find users
      // return res.json(users);
      return res.json(users.docs);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// GET User show resource action
exports.show = function(req, res, next) {
  // Receive param id
  var user_id = req.params.user_id;

  // Find user by friendlyId on MongoDB
  return User.findOne({friendlyId: user_id})
    // When promise is ready
    .then(function(user) {
      // returns error if user was not found
      if (!user) throw errorsHelper.notFoundError(t('User.NotFound', user_id));

      // returns json when find user
      return res.json(user);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// POST User create resource action
exports.create = function(req, res, next) {
  // Receive body user
  var user = new User(req.body);

  // Save user with role 'user', case exists some user on MongoDB
  return user.create()
  // return user.createByRole('admin')
    // When promise is ready
    .then(function(user) {
      // remove roles populate from user
      user.depopulate('roles');
      // returns json when save user
      return res.json(user);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// PUT User update resource action
exports.update = function(req, res, next) {
  // Receive param id
  var user_id = req.params.user_id;

  // Find user by friendlyId on MongoDB
  return User.findOne({friendlyId: user_id})
    .populate({path: 'roles', select: 'name'})
    // When promise is ready
    .then(function(user) {
      // returns error if user was not found
      if (!user) throw errorsHelper.notFoundError(t('User.NotFound', user_id));

      // Receive body user
      user.name = req.body.name ? req.body.name : user.name;
      user.gender = req.body.gender ? req.body.gender : user.gender;
      user.birthday = req.body.birthday ? req.body.birthday : user.birthday;
      // Update user on MongoDB
      return user.save();
    })
    // When promise is ready
    .then(function(user) {
      // returns json when update user
      return res.json(user);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// DELETE User remove resource action
exports.remove = function(req, res, next) {
  // Receive param id
  var user_id = req.params.user_id;

  // Find user by friendlyId on MongoDB
  return User.findOne({friendlyId: user_id})
    .populate({path: 'roles', select: 'name'})
    // When promise is ready
    .then(function(user) {
      // returns error if user was not found
      if (!user) throw errorsHelper.notFoundError(t('User.NotFound', user_id));
      // returns error if user role is admin
      if (usersHelper.isRole(user, ['admin'])) 
        throw errorsHelper.businessRuleError(t('User.Type.Admin'));

      // Remove user on MongoDB
      return user.remove();
    })
    // When promise is ready
    .then(function(user) {
      // returns json when remove newUser
      return res.json({message: 'deleted', item: user});
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// GET User Roles show resource action
exports.roles = function(req, res, next) {
  // Receive param id
  var user_id = req.params.user_id;

  // Find user by friendlyId on MongoDB
  return User.findOne({friendlyId: user_id})
    .populate({path: 'roles', select: '-users'})
    // When promise is ready
    .then(function(user) {
      // returns error if user was not found
      if (!user) throw errorsHelper.notFoundError(t('User.NotFound', user_id));

      // returns json when find user
      return res.json(user.roles);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// GET User Role add or remove resource action
exports.setRole = function(req, res, next) {
  // Receive param id
  var user_id = req.params.user_id;
  var role_id = req.params.role_id;

  // Find user by friendlyId on MongoDB
  return User.findOne({friendlyId: user_id})
    // When promise is ready
    .then(function(user) {
      // returns error if user was not found
      if (!user) throw errorsHelper.notFoundError(t('User.NotFound', user_id));

      // Add role from 'role_id' by user, case role_id exists on MongoDB 
      return user.addOrRemoveRole(role_id);
    })
    // When promise is ready
    .then(function(newUser) {
      // add roles populate from user
      return newUser.populate({path: 'roles', select: 'name'}).execPopulate()
      .then(function(userAndRoles) {
        // returns json when add role to user
        return res.json(userAndRoles);
      });
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};
