var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
  name: String,
  //Also creating index on field id
  id: {type: String, index: true},
  manufacturer: String,
  serialNo: Number,
  enterpriseNumber:String
});

module.exports=mongoose.model('Device', deviceSchema,"device_details");