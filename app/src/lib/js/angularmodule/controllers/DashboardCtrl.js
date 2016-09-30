'use strict';

var DashboardCtrl = function($scope, $http, $window, $location,userContext,$rootScope) {
    //$scope.user ={ "activatedDevices":"100", "totalDevices":"110"};
    $scope.user = userContext.getUserData();
    $scope.flag=true;
    $scope.angular=angular;

    console.log("[DashboardCtrl] checking user data unavailable "+(typeof $scope.user === 'undefined'));
    if(typeof $scope.user ==='undefined')
    {
        userContext.getUserDataFromServer().then(function(user)
        {
            $scope.user = user;
            console.log("[DashboardCtrl] saved token "+$window.sessionStorage.token);
            console.log("[DashboardCtrl] current user is $scope.user "+ $scope.user);
        });
    }

    $rootScope.$on('$stateChangeStart', function (event, next) { 
        userContext.getUserDataFromServer().then(function(user)
        {
            $scope.user = user;
            console.log("[DashboardCtrl] saved token "+$window.sessionStorage.token);
            console.log("[DashboardCtrl] current user is $scope.user "+ $scope.user);
        });
     });

    $scope.logout = function() {
        userContext.logout();
    }
    $scope.getDeviceDetail = function() {
        console.log("[DashboardCtrl.getDeviceDetail()] is getting invoked");
        userContext.getDeviceDetails()
        .then(function(data){
            console.log("[DashboardCtrl.getDeviceDetail()] data received from server is "+JSON.stringify(data));
            $scope.deviceDetails=data;
        })
      
    }
    $scope.tryDelete = function(index)
    {
        console.log("[DashboardCtrl.tryDelete()] is getting invoked for"+index)
        
        $scope.deviceDetails.splice(index,1);
    }
};

module.exports = DashboardCtrl;