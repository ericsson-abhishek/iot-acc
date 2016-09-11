// Authentication interceptor is getting used as a client side component to share the JWT token in every request
module.exports = function ($q, $location, $window) {
    return {
        'request': function (config) {
            console.log("[AuthInterceptor.request()]  available JWT token in the store " + $window.sessionStorage.token)
            // check if JWT token available
            if ($window.sessionStorage.token) {
                // add Bearer header for the JWT
                config.headers['Bearer'] = $window.sessionStorage.token;
            }
            console.log("[AuthInterceptor.request()] using interceptor  for " + config.url)
            return config;
        },
        'response': function (response) {
            console.log('[AuthInterceptor.response()] successful response is intercepted '+ response)
            return response;
        },
        'responseError': function (response) {
            console.log('[AuthInterceptor.responseError()] responseError is intercepted '+response.status)
            if (response.status == 401) {
                console.log("[AuthInterceptor.responseError()] Not Authenticated ")
                delete $window.sessionStorage.token;
                //$location.path('/login');
                $window.location.href='/';
            }
            if (response.status == 404) {
                console.log("[AuthInterceptor.responseError()] Page not found ")
                delete $window.sessionStorage.token;
                $location.path('/404');
            }
            return $q.reject(response);
        }
    }
}