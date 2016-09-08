'use strict';

var LoginFormCtrl = function($scope, $http, $window, $location) {

    $scope.appName = 'PAT';
    $scope.login = function() {
        var reqData = { "usrr": "AA" };

        console.log("---" + reqData);
        $http.post('/auth', reqData)
            .success(function(data, status, headers, config) {
                console.log(data);
                var authHeader = headers()['auth'];
                $window.sessionStorage.token = authHeader;

                $location.path('/devices');

                // $('#loginModal').modal('hide');
            }).error(function() {
                delete $window.sessionStorage.token;
                console.log("Error");
            })
    };
};

module.exports = LoginFormCtrl;