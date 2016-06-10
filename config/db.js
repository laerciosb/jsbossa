// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * MongoDB Settings Connection
 */

// Required Lib
var mongoose = require('mongoose');

// Connection
mongoose.connect('mongodb://localhost/jsbossa', function(err) {
    if(err) {
        console.log('MongoDB connection error: ', err);
    } else {
        console.log('MongoDB connection successful');
    };
});