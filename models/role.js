// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Role Model
 */

"use strict";

// Required lib
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var errors = require('../helpers/errors');

// Schema
var roleSchema = new Schema({
  name: { type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true },
  users: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

// Activators
roleSchema.plugin(uniqueValidator);

/*
 * Scopes
 */

// Return roles that can be removed from the user
roleSchema.statics.getProtectedRoles = function(next) {
  return this.find({name: {$in: ["admin", "user"]}}, next);
};

/*
 * Triggers
 */

roleSchema.pre('remove', function(next){
  // Remove all users that reference the removed roles.
  this.model('User').update({_id: {$in: this.users}}, {$pull: {roles: this._id}}, {multi: true}, next);
});

// Export Model for use into Controller
module.exports = mongoose.model('Role', roleSchema);