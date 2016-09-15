'use strict';
var RegistrationCtrl = function($scope, $http, $window, $location) {
    $scope.register = function() {
        console.log("[RegistrationCtrl.register] the method is getting called ");
        var requestObject = { username: $scope.email, password: $scope.password };

        //var deffered = $q.defer();
        $http.post('/enterprise', requestObject)
            .success(function(data, status, headers, config) {


            }).error(function(error) {

            })

    }
};
module.exports = RegistrationCtrl;