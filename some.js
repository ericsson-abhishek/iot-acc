var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/iotaccdb';
mongoose.Promise = global.Promise;
mongoose.connect(dbHost);
//Create schemas

var customerSchema = mongoose.Schema({
  number:String,  
  name: String
});


var deviceSchema = mongoose.Schema({
  name: String,
  //Also creating index on field id
  id: {type: String, index: true},
  manufacturer: String,
  serialNo: Number,
  customerNumber:String
});
//Create a Model by using the schema defined above
//Optionally one can provide the name of collection where the instances
//of this model get stored. In this case it is "device_demo". Skipping
//this value defaults the name of the collection to plural of model name i.e devices.
var Customer = mongoose.model('Customer', customerSchema, "customer_details");
var Device = mongoose.model('Device', deviceSchema, "device_details");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to DB");
});

var insertDevice = function(requestData) {
   //console.log("Enter into insert device method "+JSON.stringify(requestData));
   //check for customer existence
   console.log(requestData.customerNumber);
   Customer.find({number: {$eq:requestData.customerNumber}}, "name", function(err, result){
    if( err || result.length === 0 )  {
        console.log("Customer not found");
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

 
var queryDevices = function(input){
  console.log("Enter into query device method "+input);
  //Now querying those books which have less than 100 pages
  //Find API takes in a query condition, attributes in the document to be projected,
  //callback to be executed when the data is available.
  console.log(input);
  Device.find({customerNumber : {$eq:input}}, "name manufacturer", function(err, result){
    if ( err ) throw err;
    console.log("Find Operations: " + result);
  });
}
var updateDevice = function(input){
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

var deleteDevice = function(input){
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


var insertCustomer = function(requestData) {
   console.log("Enter into insert customer method "+JSON.stringify(requestData));
  var objToinsert = new Customer(requestData);

   console.log(objToinsert);
  //Saving the model instance to the DB
    objToinsert.save(function(err,docsInserted){
    if ( err ) throw err;
    console.log("Customer Saved Successfully"+docsInserted);
  });
 }


module.exports.insertDevice = insertDevice;
module.exports.queryDevices = queryDevices;
module.exports.updateDevice = updateDevice;
module.exports.deleteDevice = deleteDevice;


module.exports.insertCustomer = insertCustomer;
