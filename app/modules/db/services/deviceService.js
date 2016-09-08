var mongoose = require('mongoose');

var Enterprise = require('../models/enterprise');
var Device = require('../models/device');

var createDevice = function(requestData) {
   //console.log("Enter into create device method with data : "+JSON.stringify(requestData));
   //check for Enterprise existence
   var objToinsert = new Device(requestData);
   //Saving the model instance to the DB
   return objToinsert.save();
}

var queryDeviceByFilter = function (fieldName, fieldValue) {
    //console.log("Enter into query enterprise method with fieldName : " + fieldName + " and fieldValue : " + fieldValue);
    var obj = {};
    obj[fieldName] = { $eq: fieldValue };
    //Querying the model instance from DB
    return Device.find(obj);
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
module.exports.queryDeviceByFilter = queryDeviceByFilter;
module.exports.updateDeviceByName = updateDeviceByName;
module.exports.deleteDeviceById = deleteDeviceById;
