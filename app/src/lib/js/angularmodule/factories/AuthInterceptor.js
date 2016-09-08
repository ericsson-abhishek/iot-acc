module.exports = function($q, $location, $window) {
    return {
        'request': function(config) {
            console.log("From Interceptor " + $window.sessionStorage.token)
            if ($window.sessionStorage.token)
                config.headers['Bearer'] = $window.sessionStorage.token;
            console.log("using interceptor  for " + config.url)
            return config;
        },
        'response': function(response) {
            console.log('repose in intercepted')
            return response;
        },
        'responseError': function(response) {
            console.log('repose in intercepted in error')
            if (response.status == 401) {
                console.log("Not Authenticated")
                $location.path('/login');
            }
            if (response.status == 404) {
                console.log("Not Authenticated")
                $location.path('/404');
            }
            return $q.reject(response);
        }
    }
}