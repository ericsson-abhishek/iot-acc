'use strict';

var AddDeviceCtrl = function($scope, $http, $window, $location,deviceService,$rootScope) {
   

    $scope.createDevice = function() {
         var requestObject = {
            name: $scope.name,
            manufacturer: $scope.manufacturer,
            serialNo: $scope.serialNo,
            protocol: $scope.protocol
        }
console.log("[AddDeviceCtrl.createDevice()] Calling Device Service for "+ requestObject)

        deviceService.addDevice(requestObject).then(function(resp)
        {
            console.log("[AddDeviceCtrl.createDevice()] Device added successgfully "+ resp)
        });
    }
};

module.exports = AddDeviceCtrl;