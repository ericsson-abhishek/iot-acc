var persist = require("./persist");
var requestData = { name:"Grider1",id: "101",manufacturere: "Bajaj3", serialNo: 124};


console.log('Persist test class');
persist.insertDevice(requestData);
persist.queryDevices(100);
persist.updateDevice("Grider1");
persist.deleteDevice("101");