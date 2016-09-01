var mongoose = require('mongoose');

var tokenSchema = mongoose.Schema({
  //Also creating index on field id
  id: {type: String, index: true},
  enterpriseNumber:String,
  username: String,
  password: String
});

module.exports=mongoose.model('Token', tokenSchema,"token_details");