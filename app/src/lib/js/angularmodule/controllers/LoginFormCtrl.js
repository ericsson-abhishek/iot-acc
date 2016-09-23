'use strict';

var LoginFormCtrl = function($scope, userContext, $window, $location, $timeout) {

    // the following code has been added to skip the login page when user is already logged in
    // the scenario can appear when user click on the back button from the dashboard after logging in
    if ($window.sessionStorage.token) {
        // here we are redirecting the user to the home page instead of the login page.
        $location.path("/")
    }
    $scope.login = function() {
        console.log()
        if (!angular.isUndefined($scope.email)) {
            console.log("[LoginFormCtrl.login()] invoked with email" + $scope.email)
            var reqData = { email: $scope.email, password: $scope.password };
            userContext.login(reqData)
                .then(function(resp){
                    console.log("[LoginFormCtrl.login()] Resp received")
                },function(err){
                    $scope.email=undefined;
                    $scope.password=undefined;
                    $scope.login_form.$setPristine();
                    $scope.errorMessage=err;
                    $scope.error=true;
                    $timeout(function()
                    {
                        $scope.error=false;
                        // $scope.$apply();
                    },2000)
                    console.log("[LoginFormCtrl.login()] Error received "+err)
                });
        }

    };
};

module.exports = LoginFormCtrl;