// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * USERS HELPER
 */

"use strict";

// Return true if user has this role
exports.isRole = function(user, roles) {
  var _role = false;
  for (var i in user.roles) {
    if (roles.includes(user.roles[i].name)) return _role = true;
  }

  return _role;
};

// Return true if req.user._id is the same as did informed at parameter
exports.isMe = function(user, resource_id) {
  return !!(user._id == resource_id);
};