// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * MAILER HELPER
 */

"use strict";

// Required Libs
var nodemailer = require("nodemailer");
var pug = require('pug');

// Required utils
var settings = require('../config/settings');
var smtpTransport = require('../config/nodemailer');
var errorsHelper = require('../helpers/errors');

// Render html email template and send email
exports.renderAndSendMail = function(options) {
  return Promise.resolve(pug.renderFile(options.templatePath, options.variables))
    // When promise is ready
    .then(function(template) {
      var mailOptions = {
        from: options.title + '<' + settings.smtpConfig.auth.user + '>', // sender address
        to: options.emails, // list of receivers
        subject: options.subject, // Subject line
        html: template // You can choose to send an HTML body instead
      };
      //Send Mail      
      return smtpTransport.sendMail(mailOptions)
        .then(function() {
          // Comment this line out to continue sending emails.
          return smtpTransport.close();
        })
        .catch(function() {
          // returns error if email cannot be sent
          throw errorsHelper.unprocessableError(t('Mailer.SendFail'));
        });
    })
    .catch(function() {
      // returns error if template cannot be read
      throw errorsHelper.unprocessableError(t('Mailer.TemplateFail'));
    });
};
