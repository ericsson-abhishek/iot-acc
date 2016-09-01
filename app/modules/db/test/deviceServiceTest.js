var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iotaccdb');

var deviceService = require("../services/deviceService");
var deviceData = {name:"Grinder1",id:"101",manufacturer:"Bajaj1",serialNo:121,enterpriseNumber:"cus101"};

deviceService.createDevice(deviceData);
deviceService.updateDeviceByName("Bajaj2");
deviceService.queryDeviceByEnterpriseNumber("cus101");
deviceService.deleteDeviceById("101");
