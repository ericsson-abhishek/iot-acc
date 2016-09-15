'use strict';
var RootCtrl = function ($rootScope) {
    $rootScope.$on('LOADING',function(){ $rootScope.reqLoading=true;} )
    $rootScope.$on('LOADED',function(){ $rootScope.reqLoading=false;} )

}

module.exports = RootCtrl;