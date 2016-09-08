'use strict';

var DashboardCtrl = function($scope, $http, $window, $location) {
    console.log($window.sessionStorage.token);

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