// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * APP SETTINGS
 */

"use strict";

var config = {};

// Errors code settings
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

// JWT settings
config.jwt = {
  jwtSecret: "MyS3cr3tK3Y",
  jwtSession: {session: false},
  expiresIn: 10080 // In Seconds
};

module.exports = config;
