// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * ROLES CONTROLLER
 */

"use strict";

// Required models
var Role = require('../models/role');

// Required utils
var errorsHelper = require('../helpers/errors');
var settings = require('../config/settings');

// GET Roles resource action
exports.index = function(req, res, next) {
  // Initialize variables
  var queries = (req.query) ? req.query : {};
  
  // Fills variables if exists
  if (queries.name) queries.name = {$regex: '.*' + queries.name + '.*', $options: 'i'};
  // Find all roles on MongoDB
  return Role.find(queries)
    // When promise is ready
    .then(function(roles) {
      // returns json when find roles
      return res.json(roles);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// GET Role show resource action
exports.show = function(req, res, next) {
  // Receive param id
  var role_id = req.params.role_id;

  // Find role by friendlyId on MongoDB
  return Role.findOne({friendlyId: role_id})
    // When promise is ready
    .then(function(role) {
      // returns error if role was not found
      if (!role) throw errorsHelper.notFoundError(t('Role.NotFound.One', 1, {name: role_id}));
      
      // returns json when find role
      return res.json(role);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// GET Role Users show resource action
exports.users = function(req, res, next) {
  // Receive param id
  var role_id = req.params.role_id;

  // Find role by friendlyId on MongoDB
  return Role.findOne({friendlyId: role_id})
    .populate({path: 'users', select: '-roles'})
    // When promise is ready
    .then(function(role) {
      // returns error if role was not found
      if (!role) throw errorsHelper.notFoundError(t('Role.NotFound.One', 1, {name: role_id}));

      // returns json when find role
      return res.json(role.users);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// POST Role create resource action
exports.create = function(req, res, next) {
  // Receive body role
  var role = new Role(req.body);

  // Save role on MongoDB
  return role.save()
    // When promise is ready
    .then(function(role) {
      // returns json when save role
      return res.json(role);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// PUT Role update resource action
exports.update = function(req, res, next) {
  // Receive param id
  var role_id = req.params.role_id;

  // Find role by friendlyId on MongoDB
  return Role.findOne({friendlyId: role_id})
    // When promise is ready
    .then(function(role) {
      // returns error if role was not found
      if (!role) throw errorsHelper.notFoundError(t('Role.NotFound.One', 1, {name: role_id}));
      // Verify if the role is protected
      if (role.isProtected()) throw errorsHelper.businessRuleError(t('Role.BusinessRuleFail'));          
      // Receive body role
      role.name = req.body.name ? req.body.name : role.name;
      // Update role on MongoDB
      return role.save();
    })
    // When promise is ready
    .then(function(role) {
      // returns json when update role
      return res.json(role);
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// DELETE Role remove resource action
exports.remove = function(req, res, next) {
  // Receive param id
  var role_id = req.params.role_id;

  // Find role by friendlyId on MongoDB
  return Role.findOne({friendlyId: role_id})
    // When promise is ready
    .then(function(role) {
      // returns error if role was not found
      if (!role) throw errorsHelper.notFoundError(t('Role.NotFound.One', 1, {name: role_id}));
      // Verify if the role is protected
      if (role.isProtected()) throw errorsHelper.businessRuleError(t('Role.BusinessRuleFail'));

      // Remove role on MongoDB
      return role.remove();
    })
    // When promise is ready
    .then(function(role) {
      // returns json when remove role
      return res.json({message : 'deleted', item : role});
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};