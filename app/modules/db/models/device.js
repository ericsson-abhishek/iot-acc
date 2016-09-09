var mongoose = require('mongoose');
//Used for unique validator
var uniqueValidator = require('mongoose-unique-validator');
var Enterprise = require('./enterprise');

var deviceSchema = mongoose.Schema({
  name: {type: String, required: true, dropDups: true, lowercase: true, trim: true },
  manufacturer: { type: String, required: true, dropDups: true, lowercase: true, trim: true },
  serialNo: {type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true },
  protocol : {type: String, required: true, dropDups: true, lowercase: true, trim: true },
  enterpriseId:[{type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise'}],
  status : {type : Boolean , required: true, dropDups: true, lowercase: true, trim: true}
  //enterpriseEmail:{type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise'}
});

deviceSchema.plugin(uniqueValidator);
module.exports=mongoose.model('Device', deviceSchema,"device_details");