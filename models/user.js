// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Content Model
 */

// Required lib
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
    // updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('User', UserSchema);