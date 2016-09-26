module.exports = function($routeProvider) {


    $routeProvider
        .when('/', {
            templateUrl: '../home.html'
        })
        .when('/devices', {
            templateUrl: '../private/dashboard.html'
        })
        .when('/adddevices', {
            templateUrl: '../private/adddevice.html'
        })
        .when('/register', {
            templateUrl: '../registration.html'
        })
        .when('/login', {
            templateUrl: '../loginForm.html'
        })
        //.when('/register', {
        //    templateUrl: '../register.html'
        //})
        .otherwise({
            redirectTo:  '/'
        })
}