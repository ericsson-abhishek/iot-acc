module.exports= function ($q, $location, $window,$http){
    var userData;
    return{
        
        // this mehod will be called when UI tries to authenticate any user
        // here we have used the '$q' handler for returning promise objects from http calls
        // the'$q' namespace will be used by the callers of the service
        login:function(reqData)
        {
            // creating a deferred object
            var deffered = $q.defer();

            $http.post('/login', reqData)
                .success(function(data, status, headers, config) {
                    // on successfull login server would return the user details in the response body
                    // the server would also send a JWT token in the response header
                    console.log("[userContext.login()] response from the server is" + data);
                    // logging the headers received from the server
                    console.dir(headers())
                    // get the auth header from the response header
                    var authHeader = headers()['authorization'];
                    // logging the uth header 
                    console.log("[userContext.login()] authHeader received in the response is " + authHeader);
                    
                    // if a valid JWT is received, store it in local browser
                    if (authHeader) {
                        $window.sessionStorage.token = authHeader;
                    }

                    // set the userData, to be used by controller
                    userData=data;

                    // set the pash to dashboard
                    $location.path('/devices');

                    // return the deferred object
                    deffered.resolve(data);

                }).error(function(error) {
                    console.log("[userContext.login()] Error encountered  " + error);
                    delete $window.sessionStorage.token;
                    deffered.reject(error);
                })
            return deffered.promise;
        },

        // this method would return the user data that is locally available.
        getUserData:function()
        {
            return userData;
        },

        // this method will be used for fetching the user data from server
        // ideally this method should be called only if getUserData returns null or undefined
        getUserDataFromServer:function()
        {
            console.log("[userContext.getUserDataFromServer()] is called");
            var deferred = $q.defer();
            $http.get('/enterprise')
                .success(function(data, status, headers, config) {
                    console.log("[userContext.getUserDataFromServer()]response received from server is " + data);
                    deferred.resolve(data);

                }).error(function(error) {
                    console.log("[userContext.getUserDataFromServer()] error received in the response is " + error);
                    delete $window.sessionStorage.token;
                    deferred.reject(error);
                })
            return deferred.promise;
        },

        logout:function()
        {
            console.log("[userContext.logout()] invked");
             var deferred = $q.defer();
              $http.delete('/logout')
                .success(function(data, status, headers, config) {
                console.log("[userContext.logout()] data received from success response" + data);
                console.dir(headers())
                delete $window.sessionStorage.token;
                console.log("[userContext.logout()] JWT after delete " + $window.sessionStorage.token)
                $window.location.href='/';
                deferred.resolve(data)
            }).error(function() {
                delete $window.sessionStorage.token;
                console.log("[userContext.logout()] Error Encoutered");
                deferred.reject(error);
            })
             return deferred.promise;

        }
    }

}
