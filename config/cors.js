// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * CORS(Cross Origin Resource Sharing) SETTINGS
 */

"use strict";

// Required Libs
var cors = require('cors');

// Required utils
var errorsHelper = require('../helpers/errors');

// Cors Options
// var whitelist = ['http://www.laerciosb.com', 'http://example2.com'];
var whitelist = ['http://www.laerciosb.com'];
var allowedMethods = ['POST', 'PUT', 'OPTIONS', 'DELETE', 'GET'];
var allowedHeaders = ['Content-Type', 'Accept-Version', 'Accept-Language', 'Authorization'];

var corsOptions = {
  origin: function (origin, next) {
    // Validate origin in whitelist
    // next(whitelist.indexOf(origin) !== -1 ? null : errorsHelper.badRequestError(t('Access.Cors')));
    next(null);
  },
  optionsSuccessStatus: 200,
  preflightContinue: false,
  methods: allowedMethods,
  credentials: false,
  allowedHeaders: allowedHeaders,
  // Max client side cache age: 10 days
  maxAge: 60 * 60 * 24 * 10
}

module.exports = cors(corsOptions);
