'use strict';

var DashboardCtrl = function($scope, $http, $window, $location,userContext,$rootScope) {
    //$scope.user ={ "activatedDevices":"100", "totalDevices":"110"};
    $scope.user = userContext.getUserData();

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

    $scope.logout = function() {
        userContext.logout();
    }
};

module.exports = DashboardCtrl;