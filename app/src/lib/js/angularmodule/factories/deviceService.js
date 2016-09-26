module.exports= function ($q, $location, $window,$http){
    var deviceData;
    return{
        
        // this mehod will be called when UI tries to authenticate any user
        // here we have used the '$q' handler for returning promise objects from http calls
        // the'$q' namespace will be used by the callers of the service
        addDevice:function(reqData)
        {
            // creating a deferred object
            var deffered = $q.defer();
console.log("[deviceService.addDevice()] is voking server side call with  req" + reqData);
            $http.post('/device', reqData)
                .success(function(data, status, headers, config) {
                    // on successfull login server would return the user details in the response body
                    // the server would also send a JWT token in the response header
                    console.log("[deviceService.addDevice()] response from the server is" + data);
                   

                    // set the deviceData, to be used by controller
                    deviceData=data;

                    // set the pash to dashboard
                    $location.path('/devices');

                    // return the deferred object
                    deffered.resolve(data);

                }).error(function(error) {
                    console.log("[deviceService.addDevice()] Error encountered  " + error);
                    //delete $window.sessionStorage.token;
                    deffered.reject(error);
                })
            return deffered.promise;
        }
    }

}
