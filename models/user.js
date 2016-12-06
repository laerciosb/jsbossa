// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * USER MODEL
 */

"use strict";

// Required libs
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var bcryptjs = require('bcryptjs');

// Schema
var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true },
  password: { type: String, default: undefined },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

// Activators
userSchema.plugin(uniqueValidator);

/*
 * Scopes
 */

// Compare between encrypted password and not encrypted password
userSchema.methods.comparePassword = function(password, next) {
  bcryptjs.compare(password, this.password, function(err, success) {
    if (err) return next(err, 'Authentication failed. Passwords did not match.');
    else return next(null, success);

  });
};

/*
 * Triggers
 */

userSchema.pre('save', function(next) {
  // Add bcrypt in password before save.
  if (this.isModified('password') || this.isNew && this.password !== undefined)
    this.password = bcryptjs.hashSync(this.password, 10);

  // Save user reference in role.
  this.model('Role').update({_id: {$in: this.roles}}, {$push: {users: this}}, {multi: true}, next);
});

userSchema.pre('remove', function(next){
  // Remove user reference in role.
  this.model('Role').update({_id: {$in: this.roles}}, {$pull: {users: this._id}}, {multi: true}, next);
});

// userSchema.pre('save', function(next) {
//   // Save user reference in project.
//   this.model('Project').update({_id: this.project}, {$set: {user: this}}, next);
// });

// userSchema.pre('remove', function(next) {
//   // Remove user reference in project.
//   this.model('Project').update({_id: this.project}, {$unset: {user: ""}}, next);
// });

// Export Model for use into Controller
module.exports = mongoose.model('User', userSchema);
