'use strict';

// dependencies for angularjs
var angular = require('angular');
require('angular-route')
require('angular-messages')
require('angular-animate')

// defining the module
var app = angular.module('iotapp', ['ngRoute', 'ngMessages','ngAnimate']);

// adding angular controllers
// Controller for log in page
app.controller('LoginFormCtrl', require('./controllers/LoginFormCtrl'));
// controller for home page
app.controller('HomeCtrl', require('./controllers/HomeCtrl'));
// Controller for Dashboard pages
app.controller('DashboardCtrl', require('./controllers/DashboardCtrl'));
// Controller for Dashboard pages
app.controller('RegistrationCtrl', require('./controllers/RegistrationCtrl'));
// Controller for Dashboard pages
app.controller('AddDeviceCtrl', require('./controllers/AddDeviceCtrl'));

// Controller for Root page
app.controller('RootCtrl', require('./controllers/RootCtrl'));

// adding angular factories
app.factory('authInterceptor', require('./factories/AuthInterceptor'));
app.factory('userContext', require('./factories/userContext'));
app.factory('deviceService', require('./factories/deviceService'));
// add the factory as an interceptor
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}])

// adding routes
app.config(require('./routeConfig/BasicRoutes'));