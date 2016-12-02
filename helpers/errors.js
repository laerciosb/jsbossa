// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * ERRORS HELPER
 */

"use strict";

// Required utils
var settings = require('../config/settings');

// Error when not find the resource
exports.notFoundError = function(message, next) {
  var err = new Error(message || 'The requested resource couldn\'t be found');
  err.status = settings.errors.notFound;
  next(err);
};

// Error when object type is not valid
exports.typeError = function(message, next) {
  var err = new Error(message || 'The object type is not valid.');
  err.status = settings.errors.unprocessableEntity;
  next(err);
};

// Error when request is not valid
exports.badRequestError = function(message, next) {
  var err = new Error(message || 'The request is not valid.');
  err.status = settings.errors.badRequest;
  next(err);
};

// Error when is not possible to continue
exports.unprocessableError = function(message, next) {
  var err = new Error(message || 'During the request something went wrong.');
  err.status = settings.errors.unprocessableEntity;
  next(err);
};

// Error when request is not authorized
exports.notAuthorizedError = function(message, next) {
  var err = new Error(message || 'The request is not authorized.');
  err.status = settings.errors.unauthorized;
  next(err);
};

// Error in database
exports.dbError = function(dbInfo, next) {
  var message = dbInfo.errors ? 
    dbInfo.errors[Object.keys(dbInfo.errors)[0]].message : dbInfo.message;
  var err = new Error(message || 'A problem was detected during the access to database.');
  err.status = settings.errors.internalServerError;
  next(err);
};

// Error when hurts business rule
exports.businessRuleError = function(message, next) {
  var err = new Error(message || 'Due to business rule the request cannot continue.');
  err.status = settings.errors.unprocessableEntity;
  next(err);
};