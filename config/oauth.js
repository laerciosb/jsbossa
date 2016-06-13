// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * OAuth Authentication Settings
 */

var host = 'http://localhost:3000';

// Required Keys to use OAuth authentication
module.exports = {
  Facebook : {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: host + '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
  },
  Google : {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: host + '/auth/google/callback'
  }
};
