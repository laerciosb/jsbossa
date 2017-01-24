// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * PAGINATE SETTINGS
 */

"use strict";

// Required Libs
var mongoosePaginate = require('mongoose-paginate');

// Paginate Default Options
mongoosePaginate.paginate.options = { 
  lean:  true,
  limit: 15
};

module.exports = mongoosePaginate;
