'use strict';
var RegistrationCtrl = function($scope, $http, $window, $location) {
    $scope.isRegistrationSuccess = false;
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
                $scope.registeredUsername = data.firstname;
                $scope.registeredEmail = data.email;
                //$scope.$apply(function() {
                console.log("modifying isRegistrationSuccess")
                $scope.isRegistrationSuccess = true;
                // })

            }).error(function(error) {
                console.log()
            })

    }
};
module.exports = RegistrationCtrl;