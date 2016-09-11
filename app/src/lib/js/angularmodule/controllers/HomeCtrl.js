'use strict';
var HomeCtrl = function ($scope, $http, $window, $location) {
    console.log("[HomeCtrl] user info from store"+ $window.sessionStorage.token)
    if (typeof $window.sessionStorage.token === "undefined") {
        $scope.isLoggedIn = false;
        console.log("[HomeCtrl] is user logged in " + $scope.isLoggedIn)
    }
    else {
        $scope.isLoggedIn = true;
        console.log("[HomeCtrl] is user logged in " + $scope.isLoggedIn)
    }
    $scope.loginShow = function () {
        $location.path("/login");
    }
    $scope.logout = function () {
        console.log("[HomeCtrl.logout()] is user logged in " + $scope.isLoggedIn)
        $http.delete('/logout')
            .success(function (data, status, headers, config) {
                console.log("from Dashboard" + data);
                console.dir(headers())
                delete $window.sessionStorage.token;
                console.log("JWT after delete " + $window.sessionStorage.token)
                //$window.sessionStorage.token = undefined;
                //console.log("JWT after delete " + $window.sessionStorage.token)
                // $location.path('/');
                $window.location.href = '/';
                // $('#loginModal').modal('hide');
            }).error(function () {
                delete $window.sessionStorage.token;
                console.log("Error");
            })
    }
};
module.exports = HomeCtrl;