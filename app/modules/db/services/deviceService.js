var mongoose = require('mongoose');
var Enterprise = require('../models/enterprise');
var Device = require('../models/device');

var createDevice = function(requestData) {
   console.log("Enter into create device method with data : "+JSON.stringify(requestData));
   //check for Enterprise existence
   console.log(requestData.enterpriseNumber);
   Enterprise.find({number: {$eq:requestData.enterpriseNumber}}, "name", function(err, result){
    if( err || result.length === 0 )  {
        console.log("Enterprise not found");
        throw err;
    }    else {
   var objToinsert = new Device(requestData);
   console.log(objToinsert);
  //Saving the model instance to the DB
   objToinsert.save(function(err,docsInserted){
   if ( err ) throw err;
   console.log("Device Saved Successfully");
  });}
 });}

 
var queryDeviceByEnterpriseNumber = function(input){
  console.log("Enter into query device method "+input);
  //Now querying those books which have less than 100 pages
  //Find API takes in a query condition, attributes in the document to be projected,
  //callback to be executed when the data is available.
  Device.find({enterpriseNumber : {$eq:input}}, "name manufacturer", function(err, result){
    if ( err ) throw err;
    console.log("Find Operations: " + result);
  });
}
var updateDeviceByName = function(input){
  console.log("Enter into update device method "+input);
  
  /*
  Find the book to be updated using the condition and then execute the update
  passed to the API as the second argument
  */
  Device.update({name : {$eq: input}}, {$set: {name: "Mongoose Demo 3.1"}}, function(err, result){
    console.log("Updated successfully");
    console.log(result);
  });
}

var deleteDeviceById = function(input){
  console.log("Enter into delete device method "+input);
  
  /*
    When callback is not passed, the action is not invoked on the collection
    until the exec() method is called.
    In this case I am not passing the callback and instead executing the action
    by invoking the exec() method.
  */
  console.log("Deleted successfully");
  Device.remove({id:{$eq: input}}).exec();
}



module.exports.createDevice = createDevice;
module.exports.queryDeviceByEnterpriseNumber = queryDeviceByEnterpriseNumber;
module.exports.updateDeviceByName = updateDeviceByName;
module.exports.deleteDeviceById = deleteDeviceById;
