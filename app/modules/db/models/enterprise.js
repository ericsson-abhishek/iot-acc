var mongoose = require('mongoose');

var enterpriseSchema = new mongoose.Schema({
  number:String,  
  username:String,
  password:String,
  email:String
});

module.exports=mongoose.model('Enterprise', enterpriseSchema,"enterprise_details");