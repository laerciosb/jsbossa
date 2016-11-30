// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Role Model
 */

"use strict";

// Required lib
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var errors = require('../helpers/errors');

// Schema
var roleSchema = new Schema({
  name: { type: String, required: true },
  users: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

/*
 * Scopes
 */

// Return roles from user
roleSchema.statics.getSafeRoles = function () {

  return this.find({$nor: [{name: 'admin'}, {name: 'user'}]})
    .exec(function (err, role) {
      if (err) return console.log(err);
      console.log('The roles is %s', role);
    });
};

/*
 * Triggers
 */

// userSchema.pre('save', function(next) {
//   // Save user reference in project.
//   this.model('Project').update({_id: this.project}, { $set: { user: this  }}, next);
// });

// userSchema.pre('remove', function(next) {
//   // Remove user reference in project.
//   this.model('Project').update({_id: this.project}, { $unset: { user: ""  }}, next);
// });

// Export Model for use into Controller
module.exports = mongoose.model('Role', roleSchema);