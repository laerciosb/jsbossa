// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Role Model
 */

"use strict";

// Required lib
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
    name: { type: String, required: true },
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
    // updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Role', roleSchema);