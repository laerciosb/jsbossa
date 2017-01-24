// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * USER MODEL
 */

"use strict";

// Required libs
var mongoose = require('../config/db');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var bcryptjs = require('bcryptjs');
var shortId = require('shortid');

// Required utils
var settings = require('../config/settings');
var i18n = require('../config/i18n');
var errorsHelper = require('../helpers/errors');
var appHelper = require('../helpers/application');
var mongoosePaginate = require('../config/paginate');

// Required locals
var genderTypes = ['male', 'female'];

// Schema
var userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  friendlyId: { type: String, unique: true, uniqueCaseInsensitive: true, trim: true },
  email: { type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true },
  password: { type: String, default: undefined },
  gender: { type: String, default: undefined, enum: genderTypes, lowercase: true, trim: true },
  image: { type: String, default: undefined },
  birthday: { type: Date, default: undefined },
  provider: { type: String, default: 'local', lowercase: true, trim: true },
  resetPasswordToken: { type: String, default: undefined },
  resetPasswordExpires: { type: Date, default: undefined },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

// Validators
userSchema.plugin(uniqueValidator);
userSchema.plugin(mongoosePaginate);

userSchema.path('email').validate(function(email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, i18n.__('User.Field.Email.PatternFail'));

/*
 * Scopes
 */

// Create user by role name
userSchema.methods.createByRole = function(roleName) {
  var user = this;
  var opts = {'name': {$in: ['user']}};

  // Find Role on MongoDB
  return user.model('Role').findOne({name: roleName})
    // When promise is ready
    .then(function(existRole) {
      // returns error if role was not found
      if (!existRole) 
        throw errorsHelper.notFoundError(i18n.__n('Role.NotFound.One', 1, {name: roleName}));

      // All user created should has role 'user'
      if (roleName !== 'user') opts.name.$in.push(roleName);
      // Find Role by id on MongoDB
      return user.model('Role').find(opts);
    })
    .then(function(roles) {
      var count = roles.length;
      var keyName = count > 1 ? 'Role.NotFound.Other' : 'Role.NotFound.One';

      // returns error if roles was not found
      if (!count) 
        throw errorsHelper.notFoundError(i18n.__n(keyName, count, {name: opts.name.$in}));

      // Add roles to user
      user.roles = roles;
      // Save user on MongoDB and return
      return user.save();
    });
};

// Return user Found or create if not exists (First user will be admin)
userSchema.methods.findOrCreate = function() {
  var user = this;
  var opts = {'name': {$in: ['user']}};

  // Find User on MongoDB
  return user.model('User').findOne()
    // When promise is ready
    .then(function(existUser) {
      // Return if user not exists
      if (!existUser) return opts.name.$in.push('admin') && null;

      // Find User on MongoDB
      return user.model('User').findOne({email: user.email})
    })
    // When promise is ready
    .then(function(userFound) {
      // return error if user was found
      if (userFound) throw errorsHelper.duplicateError(i18n.__('User.Duplicate'), userFound);

      // All user created should has role 'user'
      return user.model('Role').find(opts)
    })
    // When promise is ready
    .then(function(roles) {
      var count = roles.length;
      var keyName = count > 1 ? 'Role.NotFound.Other' : 'Role.NotFound.One';

      // returns error if roles was not found
      if (!count) 
        throw errorsHelper.notFoundError(i18n.__n(keyName, count, {name: opts.name.$in}));

      // Add roles to user
      user.roles = roles;
      // Save user on MongoDB and return
      return user.save();
    })
    // Catch all errors and call the error handler
    .catch(function(err) {
      if (err.object) return err.object;
      throw err;
    });
};

// Create user with user role (First user will be admin)
userSchema.methods.create = function() {
  var user = this;
  var opts = {'name': {$in: ['user']}};

  // Find User on MongoDB
  return user.model('User').findOne()
    // When promise is ready
    .then(function(existUser) {
      // Return if user not exists
      if (!existUser) opts.name.$in.push('admin');

      // All user created should has role 'user'
      return user.model('Role').find(opts);
    })
    // When promise is ready
    .then(function(roles) {
      var count = roles.length;
      var keyName = count > 1 ? 'Role.NotFound.Other' : 'Role.NotFound.One';

      // returns error if roles was not found
      if (!count) 
        throw errorsHelper.notFoundError(i18n.__n(keyName, count, {name: opts.name.$in}));

      // Add roles to user
      user.roles = roles;
      // Save user on MongoDB and return
      return user.save();
    });
};

userSchema.methods.addOrRemoveRole = function(role_id) {
  var user = this;

  // Find User on MongoDB
  return user.model('Role').findOne({friendlyId: role_id})
    // When promise is ready
    .then(function(role) {
      var count = !!role;
      var keyName = 'Role.NotFound.One';

      // returns error if roles was not found
      if (!count)
        throw errorsHelper.notFoundError(i18n.__n(keyName, count, {name: role_id}));

      // Verify if role already exists in user
      if (user.roles.indexOf(role._id) === -1) user.roles.push(role);
      else {
        // Remove role from user
        user.roles.splice(user.roles.indexOf(role._id), 1);
        // Remove user reference in role
        user.model('Role').update({_id: role._id}, {$pull: {users: user._id}}).exec();
      }
      // Save user on MongoDB and return
      return user.save();
    });
};

// Compare between encrypted password and not encrypted password
userSchema.methods.comparePassword = function(password) {
  return bcryptjs.compare(password, this.password);
};

/*
 * Triggers
 */

userSchema.pre('save', function(next) {
  // Add bcrypt in password.
  if (this.isModified('password') || this.isNew && this.password !== undefined)
    this.password = bcryptjs.hashSync(this.password, 10);

  // Remove extra whitespaces presents beetwen fullname.
  this.name = this.name.replace(/\s+/g, " ");

  // Add automatic friendlyId.
  if (!this.friendlyId) {
    var friendlyId = shortId.generate();
    this.friendlyId = appHelper.replaceSpecialChars(this.name.split(" ", 3).join("-").toLowerCase().concat("-", friendlyId)
    );
  }

  // Save user reference in role.
  this.model('Role').update({_id: {$in: this.roles}}, {$addToSet: {users: this}}, {multi: true}, next);
});

userSchema.pre('remove', function(next) {
  // Remove user reference in role.
  this.model('Role').update({_id: {$in: this.roles}}, {$pull: {users: this._id}}, {multi: true}, next);
});

/*
 * Others Examples
 */

// throw errorsHelper.notFoundError(global.tn('Role.NotFound.Other', 0));
// throw errorsHelper.notFoundError(global.tn('Role.NotFound.One', 1, {name: opts.name.$in}));
// throw errorsHelper.notFoundError(global.tn('Role.NotFound.Other', 2, {name: opts.name.$in}));

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
