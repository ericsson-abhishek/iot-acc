var mongoose = require('mongoose');
var Token = require('../models/token');

var createToken = function(requestData) {
   console.log("Enter into create Token method "+JSON.stringify(requestData));
  var objToinsert = new Token(requestData);

   console.log(objToinsert);
  //Saving the model instance to the DB
    objToinsert.save(function(err,docsInserted){
    if ( err ) throw err;
    console.log("Token Saved Successfully "+docsInserted);
  });
 }

module.exports.createToken = createToken;
