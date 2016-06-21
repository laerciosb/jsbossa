// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Users Helper
 */

"use strict";

// Return true if user has this role
exports.isRole = function(user, role) {
  var _role = false;
  user.roles.forEach(function (item) {
    role.forEach(function (i) {
      if (item.name === i) {
        console.log(item);
        return _role = true;
      }
    });
  });
  return _role;
};

// Return true if req.user._id is the same as did informed at parameter
exports.isMe = function(user, resource_id) {
  console.log("user: " + user._id);
  console.log("resource_id: " + resource_id);
  return !!(user._id === resource_id);
};