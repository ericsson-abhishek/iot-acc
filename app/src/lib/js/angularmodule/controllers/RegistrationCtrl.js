'use strict';
var RegistrationCtrl = function($scope, $http, $window, $location) {
    $scope.register = function() {
        console.log("[RegistrationCtrl.register] the method is getting called ");
        var requestObject = {
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            username: $scope.username,
            password: $scope.password,
            email: $scope.email
        }

        //var deffered = $q.defer();
        $http.post('/enterprise', requestObject)
            .success(function(data, status, headers, config) {
                console.log("Enterprize with " + data.firstname + " created successfully")

            }).error(function(error) {
                console.log()
            })

    }
};
module.exports = RegistrationCtrl;