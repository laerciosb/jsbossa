// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * User Model
 */

"use strict";

// Required lib
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true },
    password: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
    // updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

userSchema.plugin(uniqueValidator);

// assign a function to the "methods" object of our animalSchema
userSchema.statics.getRoles = function getRoles(id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('not a mongoose id: ' + id);
    }

    return this.findOne({ _id: id })
      .populate('roles', 'name') // only return the Roles name
      .exec(function (err, user) {
          if (err) return handleError(err);
          console.log('The roles is %s', user.roles);
      });
};


module.exports = mongoose.model('User', userSchema);