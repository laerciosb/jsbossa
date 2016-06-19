// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * Roles Controller
 */

"use strict";

// Required model
var Role = require('../models/role');

// GET Roles resource action
exports.index = function(req, res) {

    // Find all roles on MongoDB
    return Role.find(function (err, roles) {
        if (!err) {

            // returns json with all roles
            res.json(roles);

        } else {
            // returns error when can not find roles
            return console.log(err);
        }
    });

};

// GET Role show resource action
exports.show = function(req, res) {

    // Receive param id
    var id = req.params.id;

    // Find role by id on MongoDB
    return Role.findById(id, function (err, role) {
        if (!err) {

            // returns json when find a role
            res.json(role);

        } else {
            // returns error when can not find role
            return console.log(err);
        }
    });

};

// POST Role create resource action
exports.create = function(req, res) {

    // Receive body role
    var role = new Role(req.body);

    // Save role on MongoDB
    role.save(function(err) {
        if (!err) {

            // returns json when save role
            res.json(role);

        } else {
            // returns error when can not save role
            return console.log(err);
        }
    });

};

// PUT Role update resource action
exports.update = function(req, res) {

    // Receive param id
    var id = req.params.id;

    // Receive body role
    var body = req.body;

    // Find role by id
    return Role.findById(id, function (err, role) {
        if (!err) {

            // Validate presence of fields
            role.name = body.name || role.name;

            // Update role on MongoDB
            role.update({
                name : role.name
            }, function (err) {
                if (!err) {

                    // returns json when update role
                    res.json(role);

                } else {
                    // returns error when can not update role
                    return console.log(err);
                }
            });

        } else {
            // returns error when can not find id of role
            return console.log(err);
        }

    });

};

// DELETE Role remove resource action
exports.remove = function(req, res) {

    // Receive param id
    var id = req.params.id;

    // Find role by id
    return Role.findById(id, function (err, role) {
        if (!err) {

            // Remove role on MongoDB
            role.remove(function (err) {
                if (!err) {

                    // returns json when remove role
                    res.json({message : 'deleted', item : role});

                } else {
                    // returns error when can not remove role
                    return console.log(err);
                }
            });

        } else {
            // returns error when can not find id of role
            return console.log(err);
        }

    });

};