// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * MongoDB Settings Connection
 */

"use strict";

// Required Lib
var mongoose = require('mongoose');

// My Lib for javascript Promises
mongoose.Promise = require('bluebird');

// Connection
mongoose.connect('mongodb://localhost/jsbossa', function(err) {
  if(err) {
    console.log('MongoDB connection error: ', err);
  } else {
    console.log('MongoDB connection successful');
  };
});