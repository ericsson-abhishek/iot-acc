
module.exports = function($stateProvider, $urlRouterProvider,$uiViewScrollProvider) {
        //  $uiViewScrollProvider.useAnchorScroll()
    $stateProvider
        .state('home', {
            url:'/',
            templateUrl: '../home.html'
        })
        .state('devices', {
            url:'/devices',
            templateUrl: '../private/dashboard.html'
        })
        .state('create', {
             url:'/create',
            templateUrl: '../private/adddevice.html'
        })
        .state('register', {
            url:'/register',
            templateUrl: '../registration.html'
        })
        .state('login', {
            url:'/login',
            templateUrl: '../loginForm.html'
        });
        //.when('/register', {
        //    templateUrl: '../register.html'
        //})
        $urlRouterProvider.otherwise('/');

}