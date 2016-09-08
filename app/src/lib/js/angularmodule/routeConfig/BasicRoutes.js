module.exports = function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '../home.html'
        })
        .when('/devices', {
            templateUrl: '../private/dashboard.html'
        })
        .when('/login', {
            templateUrl: '../loginForm.html'
        })
        .when('/register', {
            templateUrl: '../register.html'
        })
        .otherwise({
            redirectTo: '/'
        })
}