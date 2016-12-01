// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Errors Helper
 */

"use strict";
var settings = require('../config/settings');

// Error when not find the resource
exports.notFound = function(message, next) {
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