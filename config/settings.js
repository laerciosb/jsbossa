// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * APP SETTINGS
 */

"use strict";

var config = {};

/*
 * Host Settings
 */

var host = 'http://localhost';
var port = '3000';

/*
 * Errors Code Settings
 */

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

/*
 * JWT Settings
 */

config.jwt = {
  jwtSecret: "MyS3cr3tK3Y",
  jwtSession: {session: false},
  expiresIn: 10080 // In Seconds
};

/*
 * OAuth Authentication Settings
 */

// Required Keys to use OAuth authentication
config.oauth = {
  Facebook : {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    profileFields: ['id', 'displayName', 'email', 'photos', 'gender', 'link', 'birthday', 'currency', 'hometown']
  }
}

module.exports = config;
