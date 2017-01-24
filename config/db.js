// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * DATABASE SETTINGS
 */

"use strict";

// Required Libs
var mongoose = require('mongoose');

// My global lib for javascript Promises
mongoose.Promise = global.Promise;

// Connection
mongoose.connect('mongodb://localhost/jsbossa');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', function(){
  console.log('MongoDB connection successful');
});

module.exports = mongoose;
