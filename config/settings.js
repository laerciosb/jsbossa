// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * App Settings
 */

"use strict";

var config = {};

// Errors

config.errors = {
  unauthorized: 401,
  forbidden: 403,
  unprocessableEntity: 422,
  notFound: 404,
  unsupportableMediaType: 415,
  badRequest: 400,
  payloadTooLarge: 413,
  tooManyRequests: 429,
  preconditionFailed: 412,
  internalServerError: 500,
  serviceUnavailable: 503,
  badGateway: 502
};

module.exports = config;