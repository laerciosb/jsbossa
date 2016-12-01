// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Roles Controller
 */

"use strict";

// Required model
var Role = require('../models/role');
var errors = require('../helpers/errors');

// GET Roles resource action
exports.index = function(req, res, next) {

  // Receive query
  var query = {};

  var user = req.query.user;
  if(user) query.user = user;

  // Find all roles on MongoDB
  return Role.find(query, function (err, roles) {
    // returns in error case
    if (err) return errors.dbError(err, next);
    // returns json when find roles
    res.json(roles);
  });

};

// GET Role show resource action
exports.show = function(req, res, next) {

  // Receive param id
  var role_id = req.params.role_id;

  // Find role by id on MongoDB
  return Role.findById(role_id, function (err, role) {
    // returns error if role was not found
    if (role === undefined || role === null)
      return errors.notFound('The role was not found', next);
    // returns in error case
    if (err) return errors.dbError(err, next);
    // returns json when find roles
    res.json(role);
  });

};

// POST Role create resource action
exports.create = function(req, res, next) {

  // Receive body role
  var role = new Role(req.body);

  // Save role on MongoDB
  role.save(function(err, role) {
    // returns in error case
    if (err) return errors.dbError(err, next);
    // returns json when find roles
    res.json(role);
  });

};

// PUT Role update resource action
exports.update = function(req, res, next) {

  // Receive param id
  var role_id = req.params.role_id;

  // Find role by id
  return Role.findById(role_id, function (err, role) {
    // returns error if role was not found
    if (role === undefined || role === null)
      return errors.notFound('The role was not found', next);
    // returns in error case
    if (err) return errors.dbError(err, next);
    
    new Promise(function(resolve) {
      // Get the protected roles that cannot be removed
      resolve(Role.getProtectedRoles());
    })
      // When promise is ready
      .then(function(protectedRoles) {
        // Receive body role
        role.name = req.body.name ? req.body.name : role.name;

        var compareRole = JSON.stringify(role);
        for (var i in protectedRoles) {
          var compareI = JSON.stringify(protectedRoles[i]);

          // returns error if role is protected
          if (compareRole === compareI)
            return errors.businessRuleError('Sorry, this Role not should be updated', next);

        }

        // Update role on MongoDB
        role.save(function(err, role) {
          // returns in error case
          if (err) return errors.dbError(err, next);
          // returns json when remove role
          res.json(role);
        });

      });
      
  });

};

// DELETE Role remove resource action
exports.remove = function(req, res, next) {

  // Receive param id
  var role_id = req.params.role_id;

  // Find role by id
  return Role.findById(role_id, function (err, role) {
    // returns error if role was not found
    if (role === undefined || role === null)
      return errors.notFound('The role was not found', next);
    // returns in error case
    if (err) return errors.dbError(err, next);
    
    new Promise(function(resolve) {
      // Get the protected roles that cannot be removed
      resolve(Role.getProtectedRoles());
    })
      // When promise is ready
      .then(function(protectedRoles) {
        var compareRole = JSON.stringify(role);

        for (var i in protectedRoles) {
          var compareI = JSON.stringify(protectedRoles[i]);

          // returns error if role is protected
          if (compareRole === compareI)
            return errors.businessRuleError('Sorry, this Role not should be deleted', next);

        }

        // Remove role on MongoDB
        role.remove(function(err) {
          // returns in error case
          if (err) return errors.dbError(err, next);
          // returns json when remove role
          res.json({message : 'deleted', item : role});
        });

      });
      
  });

};