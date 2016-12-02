// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * DATABASE SETTINGS
 */

"use strict";

// Required Libs
var mongoose = require('mongoose');

// My Lib for javascript Promises
mongoose.Promise = require('bluebird');

// Connection
mongoose.connect('mongodb://localhost/jsbossa', function(err) {
  if(err) console.log('MongoDB connection error: ', err);
  else console.log('MongoDB connection successful');
});
