// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Users Controller
 */

"use strict";

// Required model
var User = require('../models/user');
var bcryptjs = require('bcryptjs');

// GET Users resource action
exports.index = function(req, res) {

  // Find all users on MongoDB
  return User.find(function (err, users) {
    if (!err) {

      // returns json with all users
      res.json(users);

    } else {
      // returns error when can not find users
      return console.log(err);
    }
  }).populate({ path: 'roles', select: 'name' });

};

// GET User show resource action
exports.show = function(req, res) {

  // Receive param id
  var id = req.params.id;

  // Find user by id on MongoDB
  return User.findById(id, function (err, user) {
    if (!err) {

      // returns json when find a user
      res.json(user);

    } else {
      // returns error when can not find user
      return console.log(err);
    }
  });

};

// POST User create resource action
exports.create = function(req, res) {

  // Receive body user
  var user = new User(req.body);
  user.password = bcryptjs.hashSync(user.password, 8);
  var Role = require('../models/role');
  var _role;

  var promise = Role.findOne({ 'name': 'user' }, function (err, role) {
    if (err) return console.log(err);
    user.roles.push(role);
    role.users.push(user);
    _role = role;
  }).exec();

  promise.then(function () {
    // Save user on MongoDB
    user.save(function(err) {
      // returns error when can not save user
      if (err) return console.log(err);
      // returns json when save user
      res.json(user);
    });
  })
  .then(function () {
    // Save user on MongoDB
    Role.update({_id : _role._id}, _role, function(err) {
      if (err) return console.log(err);
    });
  });
};

// PUT User update resource action
exports.update = function(req, res) {

  // Receive param id
  var id = req.params.id;

  // Receive body user
  var body = req.body;

  // Find user by id
  return User.findById(id, function (err, user) {
    if (!err) {

      // Validate presence of fields
      user.name = body.name || user.name;
      user.email = body.email || user.email;

      // Validate password field
      if(body.password){
        user.password = bcryptjs.hashSync(body.password, 8);
      }

      // Update user on MongoDB
      user.update({
        name : user.name,
        email : user.email,
        password : user.password
      }, function (err) {
        if (!err) {

          // returns json when update user
          res.json(user);

        } else {
          // returns error when can not update user
          return console.log(err);
        }
      });

    } else {
      // returns error when can not find id of user
      return console.log(err);
    }

  });

};

// DELETE User remove resource action
exports.remove = function(req, res) {

  // Receive param id
  var id = req.params.id;

  // Find user by id
  var promise = User.getRoles(id);
  promise.then(function (user) {
    // Remove user on MongoDB
    user.remove(function (err) {
      // returns error when can not save user
      if (err) return console.log(err);
      // returns json when remove user
      res.json({message : 'deleted', item : user});
    });
    return user;
  })
  .then(function (user) {
    var Role = require('../models/role');
    user.roles.forEach(function (role_id) {
      // Save user on MongoDB
      var promise = Role.findById(role_id).exec();
      promise.then(function (role) {
        role.users.pull(user._id);
        role.save(function (err) {
          // returns error when can not save user
          if (err) return console.log(err);
        });
      });

    });
  });


};