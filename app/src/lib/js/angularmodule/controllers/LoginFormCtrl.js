'use strict';

var LoginFormCtrl = function($scope, $http, $window, $location) {

    $scope.appName = 'PAT';
    $scope.login = function() {
        console.log("name" + $scope.email)
        var reqData = { email: $scope.email, password: $scope.password };

        console.log("---" + reqData);
        $http.post('/login', reqData)
            .success(function(data, status, headers, config) {
                console.log("from Controller" + data);
                console.dir(headers())
                var authHeader = headers()['authorization'];
                console.log("authHeader from controller" + authHeader);
                if (authHeader) {
                    $window.sessionStorage.token = authHeader;
                }

                $location.path('/devices');

            }).error(function() {
                delete $window.sessionStorage.token;
                console.log("Error");
            })
    };
};

module.exports = LoginFormCtrl;