console.log('Tested with Travis');

var mongoose = require("mongoose");

var connect = mongoose.connect('mongodb://localhost:27017/iotaccdb');

console.log(connect);
