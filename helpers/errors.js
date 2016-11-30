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