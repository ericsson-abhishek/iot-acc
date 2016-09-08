'use strict';

// dependencies for angluar
var angular = require('angular');
require('angular-route')

var app = angular.module('iotapp', ['ngRoute']);

// adding angular controllers
app.controller('LoginFormCtrl', require('./controllers/LoginFormCtrl'));
app.controller('HomeCtrl', require('./controllers/HomeCtrl'));
app.controller('DashboardCtrl', require('./controllers/DashboardCtrl'));

// adding angular factories
app.factory('authInterceptor', require('./factories/AuthInterceptor'));

// add the factory as an interceptor
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}])

// adding routes
app.config(require('./routeConfig/BasicRoutes'));