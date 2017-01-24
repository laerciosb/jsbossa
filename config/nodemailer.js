// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * NODEMAILER SETTINGS
 */

"use strict";

// Required Libs
var nodemailer = require("nodemailer");

// Required utils
var settings = require('../config/settings');

/*
  STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport(settings.smtpConfig);

module.exports = smtpTransport;
