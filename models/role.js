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

// assign a function to the "methods" object of our roleSchema
roleSchema.statics.getSafeRoles = function () {

    return this.find({$nor: [{name: 'admin'}, {name: 'user'}]})
        .exec(function (err, role) {
            if (err) return console.log(err);
            console.log('The roles is %s', role);
        });
};


module.exports = mongoose.model('Role', roleSchema);