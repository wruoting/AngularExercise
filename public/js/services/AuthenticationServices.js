angular.module('AuthenticationService',[])
  .factory('AuthenticationService', AuthenticationServices)
AuthenticationServices.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService']

  function AuthenticationServices($http, $cookies, $rootScope, $timeout, UserService) {
    var service = {}

    service.Login = Login
    service.SetCredentials = SetCredentials
    service.ClearCredentials = ClearCredentials
    return service

    function Login(username,password,callback) {
      /* Dummy authentican for testing, uses $timeout to simulate api call
       ---------------------------------------------------*/
       $timeout(function() {
         var response
         UserService.GetByUsername(username)
          .then(function (user)) {
            if(user != null && user.password === password) {
              response = {success: true}
            } else {
              response = {success: false, message: 'Username or password is incorrect.'}
            }
            callback(response)
          }
       }, 1000)

       //real authentication
       // $http.post('/api/authenticate', {username: username,password:password})
       //  .success(function(response) {
       //    callback(response)
       //  })

       function setCredentials(username,password) {
         var authdata = Base64.encode(username + ":" + password)
       }
    }
  }
