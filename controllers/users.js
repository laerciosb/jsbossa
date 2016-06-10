// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Users Controller
 */

// Required model
var User = require('../models/user');
var bcrypt = require('bcrypt');

// GET Users resource action
exports.index = function(req, res, next) {

    // Find all users on MongoDB
    return User.find(function (err, users) {
        if (!err) {

            // returns json when find users
            res.json(users);

        } else {
            // returns error when can not find users
            return console.log(err);
        }
    });

};

// GET User show resource action
exports.show = function(req, res, next) {

    // Receive param id
    var id = req.params.id;

    // Find user by id on MongoDB
    return User.findById(id, function (err, user) {
        if (!err) {

            // returns json when find user
            res.json(user);

        } else {
            // returns error when can not find user
            return console.log(err);
        }
    });

};

// POST User create resource action
exports.create = function(req, res, next) {

    // Receive body user
    var user = new User(req.body);
    user.password = bcrypt.hashSync(user.password, 8);

    // Save user on MongoDB
    user.save(function(err) {
        if (!err) {

            // returns json when save user
            res.json(user);

        } else {
            // returns error when can not save user
            return console.log(err);
        }
    });

};

// PUT User update resource action
exports.update = function(req, res, next) {

    // Receive param id
    var id = req.params.id;

    // Receive body user
    var body = req.body;

    // Find user by id
    return User.findById(id, function (err, user) {
        if (!err) {

            // Update user on MongoDB
            user.update({
                name : body.name,
                email : body.email,
                password : bcrypt.hashSync(body.password, 8)
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
exports.remove = function(req, res, next) {

    // Receive param id
    var id = req.params.id;

    // Find user by id
    return User.findById(id, function (err, user) {
        if (!err) {

            // Remove user on MongoDB
            user.remove(function (err) {
                if (!err) {

                    // returns json when remove user
                    res.json({message : 'deleted', item : user});

                } else {
                    // returns error when can not remove user
                    return console.log(err);
                }
            });

        } else {
            // returns error when can not find id of user
            return console.log(err);
        }

    });

};