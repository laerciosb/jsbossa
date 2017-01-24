// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * ROLE MODEL
 */

"use strict";

// Required libs
var mongoose = require('../config/db');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var shortId = require('shortid');

// Required utils
var appHelper = require('../helpers/application');

// Schema
var roleSchema = new Schema({
  name: { type: String, unique: true, required: true, uniqueCaseInsensitive: true, 
    lowercase: true, trim: true },
  friendlyId: { type: String, unique: true, uniqueCaseInsensitive: true, trim: true },
  users: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

// Activators
roleSchema.plugin(uniqueValidator);

/*
 * Scopes
 */

var protectedRoles = ["admin", "user"];

// Return roles that can be removed from the user
roleSchema.statics.getProtecteds = function(next) {
  return this.find({name: {$in: protectedRoles}}, next);
};

// Verify if role is protected
roleSchema.methods.isProtected = function() {
  return protectedRoles.includes(this.friendlyId.slice(0, this.friendlyId.lastIndexOf('-')));
};

/*
 * Triggers
 */

roleSchema.pre('save', function(next){
  // Remove extra whitespaces presents beetwen fullname.
  this.name = appHelper.replaceSpecialChars(this.name.replace(/\s+/g, " ").replace(/ /g, "-"));

  // Add automatic friendlyId.
  if (!this.friendlyId) {
    var friendlyId = shortId.generate();
    this.friendlyId = this.name.concat("-", friendlyId);
  }

  next();
});

roleSchema.pre('remove', function(next){
  // Remove all users that reference the removed roles.
  this.model('User').update({_id: {$in: this.users}}, {$pull: {roles: this._id}}, {multi: true}, next);
});

// Export Model for use into Controller
module.exports = mongoose.model('Role', roleSchema);
