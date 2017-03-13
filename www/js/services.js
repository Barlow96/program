angular.module('app.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
      var service = this;

      service.responseError = function (response) {
        if (response.status === 401) {
          $rootScope.$broadcast('unauthorized');
        }
        return $q.reject(response);
      };
    })

    .service('LoginService', function (Backand) {
      var service = this;

      service.signin = function (email, password) {
        //call Backand for sign in
        return Backand.signin(email, password);
      };

      service.socialSignin = function (provider) {
        return Backand.socialSignin(provider);
      };

      service.socialSignup = function (provider) {
        return Backand.socialSignup(provider);
      };

      service.signout = function () {
        return Backand.signout();
      };

      service.signup = function(firstName, lastName, email, password, confirmPassword){
        return Backand.signup(firstName, lastName, email, password, confirmPassword);
      };

      service.getUsername = function(){
        return Backand.user.getUsername();

      };

    });
