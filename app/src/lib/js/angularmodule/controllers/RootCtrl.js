'use strict';
var RootCtrl = function ($rootScope,$scope) {
    // $rootScope.$on('LOADING',function(){ $rootScope.reqLoading=true;} )
    // $rootScope.$on('LOADED',function(){ $rootScope.reqLoading=false;} )
    $scope.viewClass = 'animate-default';
//     value = 0; /* NEVER */
// value = 1; /* ALWAYS */
// value = 2; /* WHEN_NEEDED */
    

}

module.exports = RootCtrl;