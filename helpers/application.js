// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/*
 * APPLICATION HELPER
 */

"use strict";

// Return initial parameter without scpecial characters
exports.replaceSpecialChars = function(str) {
  var specialChars  = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
  var acceptChars   = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
  var newStr = '';

  for(var i = 0; i < str.length; i++) {
    var thisChar = str.substr(i,1);
    var thisCharInSpecialChars = specialChars.search(thisChar);

    if (thisCharInSpecialChars >= 0)
      newStr += acceptChars.substr(thisCharInSpecialChars,1);
    else newStr += thisChar;
  }

  return newStr;
};
