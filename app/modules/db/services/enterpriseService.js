var mongoose = require('mongoose');
var Enterprise = require('../models/enterprise');

var createEnterprise = function(requestData) {
   console.log("Enter into insert Enterprise method "+JSON.stringify(requestData));
  var objToinsert = new Enterprise(requestData);

   console.log(objToinsert);
  //Saving the model instance to the DB
    objToinsert.save(function(err,docsInserted){
    if ( err ) throw err;
    console.log("Enterprise Saved Successfully "+docsInserted);
  });
 }


module.exports.createEnterprise = createEnterprise;
