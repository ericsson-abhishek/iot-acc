'use strict';

var LoginFormCtrl = function($scope,userContext,$window,$location) {

    // the following code has been added to skip the login page when user is already logged in
    // the scenario can appear when user click on the back button from the dashboard after logging in
    if($window.sessionStorage.token )
    {
        // here we are redirecting the user to the home page instead of the login page.
        $location.path("/")
    }
    $scope.appName = 'PAT';
    $scope.login = function() {
        console.log("[LoginFormCtrl.login()] invoked with email "+$scope.email)
        var reqData = { email: $scope.email, password: $scope.password };
        userContext.login(reqData);

    };
};

module.exports = LoginFormCtrl;