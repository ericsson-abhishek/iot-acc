//var persist = require("./some");
//var deviceData = {name:"Grinder2",id:"102",manufacturer:"Bajaj2",serialNo:128,customerNumber:"cus101"};

//var customerData = {number:"cus101",name:"Avishek"};


//console.log('Persist test class');
//persist.insertCustomer(customerData);
//persist.insertDevice(deviceData);

// persist.queryDevices("cus101");

// var http = require('http');

// var server = http.createServer(function (request, response) {
//     response.writeHead(200, {
//         'Content-Type': 'text/plain',
//         'Authorization' : 'Value'
//     });
//     response.end('Hello World\n');
// });

// console.log("Before");
// server.listen(8380);
// console.log("After");

// var express = require('express');
// var app = express();

// var requestTime = function (req, res, next) {
//   req.requestTime = Date.now();
//   next();
// };

// app.use(requestTime);

// app.get('/', function (req, res) {
//   var responseText = 'Hello World!<br>';
//   responseText += '<small>Requested at: ' + req.requestTime + '</small>';
//   res.send(responseText);
// });

// // app.listen(3000);
// var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
// // Define your schema as normal. 
// var enterpriseSchema = new mongoose.Schema({
//     username: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     email: { type: String, unique: true, required: true}
// });

// enterpriseSchema.plugin(uniqueValidator);
// var Enterprise = mongoose.model('Enterprise', enterpriseSchema, "enterprise_details");
 
// // Apply the uniqueValidator plugin to userSchema. 

// //function to create an enterprise
// var createEnterprise = function () {
//     mongoose.connect('mongodb://localhost:27017/iotaccdb');
//     return new Enterprise({username: "SudarsanSahoo11", password : "Sahoo123", email: "sss@sss11.com"}).save();
// }


// createEnterprise().then(function(res){
//     console.log("Success");
// }).catch(function(err){
//     console.log(err);
// });

var mongoose = require('mongoose');
//Used for unique validator
var uniqueValidator = require('mongoose-unique-validator');

var deviceSchema = mongoose.Schema({
  name: {type: String, required: true, dropDups: true, lowercase: true, trim: true },
  manufacturer: { type: String, required: true, dropDups: true, lowercase: true, trim: true },
  serialNo: {type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true },
  enterpriseEmail:{ type: String, required: true, lowercase: true, trim: true }
});

deviceSchema.plugin(uniqueValidator);
var Device = mongoose.model('Device', deviceSchema,"device_details");

var createDevice = function(requestData) {
   //console.log("Enter into create device method with data : "+JSON.stringify(requestData));
   //check for Enterprise existence
   var objToinsert = new Device(requestData);
   mongoose.connect('mongodb://localhost:27017/iotaccdb');
   //Saving the model instance to the DB
   return objToinsert.save();
}

var deviceData = {name:"Grinder1",manufacturer:"Bajaj1",serialNo:"121",enterpriseEmail:"sss@sss.com"};
createDevice(deviceData).then(function(res){
    console.log(res);
}).catch(function(err){
    console.log(err);
});