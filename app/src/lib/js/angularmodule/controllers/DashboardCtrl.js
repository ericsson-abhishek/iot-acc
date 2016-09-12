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




    console.dir($scope.user);
    $scope.logout = function() {
        $http.delete('/logout')
            .success(function(data, status, headers, config) {
                console.log("from Dashboard" + data);
                console.dir(headers())
                delete $window.sessionStorage.token;
                console.log("JWT after delete " + $window.sessionStorage.token)
                $window.sessionStorage.token = undefined;
                console.log("JWT after delete " + $window.sessionStorage.token)
                    // $location.path('/');
                $window.location.href='/';
                // $('#loginModal').modal('hide');
            }).error(function() {
                delete $window.sessionStorage.token;
                console.log("Error");
            })
    }
};

module.exports = DashboardCtrl;