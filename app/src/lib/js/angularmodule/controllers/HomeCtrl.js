'use strict';

var HomeCtrl = function($scope, $http, $window, $location) {

    $scope.loginShow = function() {
        $location.path("/login");
    }

};

module.exports = HomeCtrl;