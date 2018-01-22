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

       function SetCredentials(username,password) {
         var authdata = Base64.encode(username + ":" + password)
         //rootscope is the parent of scope, and allows us to get all controllers
         //scope cannot see outside of its controller
         $rootScope.globals = {
           currentUser: {
             username: username,
             authdata: authdata
           }
         }
         //set default auth header for http requests
         $http.defaults.headers.common.Authorization = 'Basic' + authdata

         //store user details in globals cookie that keeps user logged in for 1 week or until they log out
         var cookieExp = new Date()
         cookieExp.setDate(cookieExp.getDate() + 7)
         //key, value, options
         $cookies.putObject('globals',$rootScope.globals,{expires: cookiesExp})
       }

       function ClearCredentials() {
         $rootScope.globals = {}
         $cookies.remove('globals')
         $http.defaults.headers.commmon.Authorization = 'Basic'
       }
       //base64 encoding
       var Base64 = {
         keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
         encode: function(input) {
           var output = ""
           var chr1,chr2,chr3 = ""
           var enc1,enc2,enc3,enc4 = ""
           var i = 0

           do {

             chr1 = input.charCodeAt(i++)
             chr2 = input.charCodeAt(i++)
             chr3 = input.charCodeAt(i++)

             enc1 = chr1 >> 2 //bitwise pushes the leftmost in from the left, and the rightmost bits fall off
             enc2 = ((chr1 & 3) << 4) | (chr2 >> 4) //set each bit to one if both bits are 1
             enc3 = ((chr2 & 15) << 2) | (chr3 >> 6) //<< shifts by pushing zeroes from the right and the right falls off
             enc4 = chr3 & 63

             //for the last character
             if(isNaN(chr2)) {
               enc3 = enc4 = 64
             } else if(isNaN(chr3)) {
               enc4 = 64
             }

              output = output +
              this.keyStr.charAt(enc1) +
              this.keyStr.charAt(enc2) +
              this.keyStr.charAt(enc3) +
              this.keyStr.charAt(enc4)

              chr1 = chr2 = chr3 = ""
              enc1 = enc2 = enc3 = enc4 = ""
           } while (i < input.length)
           return output
         },
         decode: function(input) {
            var output = ""
            var chr1,chr2,chr3 = ""
            var enc1,enc2,enc3,enc5 = ""
            var i = 0

            //searches for base64test in input
            //match a single character not present in the list below
            var base64test = /[^A-Za-z0-9\+\/\=]/g
            if(base64test.exec(input)) {
              window.alert("There were invalid base64 characters in the input text.\n" +
                   "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                   "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g,"")

            do {
              enc1 = this.keyStr.indexOf(input.charAt(i++))
              enc2 = this.keyStr.indexOf(input.charAt(i++))
              enc3 = this.keyStr.indexOf(input.charAt(i++))
              enc4 = this.keyStr.indexOf(input.charAt(i++))

              chr1 = (enc1 << 2) | (enc2 >> 4)
              chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
              chr3 = ((enc3 & 3) << 6) | enc4

              //returns a string from UTF 16 specified units
              output = output + String.fromCharCode(chr1)

              if (enc3 != 64) {
                output = output + String.fromCharCode(chr2)
              }
              if(enc4 != 64) {
                output = output + String.fromCharCode(chr3)
              }

               chr1 = chr2 = chr3 = ""
               enc1 = enc2 = enc3 = enc4 = ""
            } while (i<input.length)
            return output
          }
         }
       }
    }
