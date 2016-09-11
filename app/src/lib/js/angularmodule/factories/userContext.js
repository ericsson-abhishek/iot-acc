module.exports= function ($q, $location, $window,$http){
    var userData;
    return{
        getUserData:function()
        {
            return userData;
        },
        login:function(reqData)
        {
            var deffered = $q.defer();
            $http.post('/login', reqData)
                .success(function(data, status, headers, config) {
                    console.log("[userContext.login()] response from the server is" + data);
                    console.dir(headers())
                    var authHeader = headers()['authorization'];
                    console.log(" [userContext.login()] authHeader received in the response is " + authHeader);
                    if (authHeader) {
                        $window.sessionStorage.token = authHeader;
                    }
                    userData=data;

                    $location.path('/devices');
                    deffered.resolve(data);

                }).error(function(error) {
                    console.log(" [userContext.login()] Error encountered  " + error);
                    delete $window.sessionStorage.token;
                    deffered.reject(error);
                })
            return deffered.promise;
        },

        getUserDataFromServer:function()
        {
            console.log(" [userContext.getUserDataFromServer()] is called");
            var deferred = $q.defer();
            $http.get('/enterprise')
                .success(function(data, status, headers, config) {
                    console.log(" [userContext.getUserDataFromServer()]response received from server is " + data);
                    deferred.resolve(data);

                }).error(function(error) {
                    console.log(" [userContext.getUserDataFromServer()] error received in the response is " + error);
                    delete $window.sessionStorage.token;
                    deferred.reject(error);
                })
            return deferred.promise;
        }
    }

}
