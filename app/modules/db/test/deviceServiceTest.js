var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iotaccdb');

var enterpriseService = require("../services/enterpriseService");
var deviceService = require("../services/deviceService");
var deviceData = {name:"Grinder1",manufacturer:"Bajaj1",serialNo:"641122674",enterpriseEmail:"sss@sss.com"};

deviceService.createDevice(deviceData).then(function(res){
    console.log(res);
}).catch(function(err){
    console.log(err);
});;
// deviceService.updateDeviceByName("Bajaj2");
// deviceService.queryDeviceByEnterpriseNumber("cus101");
// deviceService.deleteDeviceById("101");
