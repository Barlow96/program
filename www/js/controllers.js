angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', function($state, $rootScope, $scope, LoginService, $ionicHistory, $ionicPopup) {

    var vm = this;

    function signin() {
      LoginService.signin(vm.email, vm.password)
        .then(function () {
          onLogin();
        }, function (error) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Invalid Username or Password'
            });
          console.log(error)
        })
    }

    function onLogin(username) {
      $rootScope.$broadcast('authorized');
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('menu.home');
      LoginService.getUsername()
        .then(function(response) {
          vm.username = username || response.data;
        })
    }

    function signout() {
      LoginService.signout()
        .then(function() {
          //$state.go('tab.login');
          $rootScope.$broadcast('logout');
          $state.reload();
          vm.username = '';
        })
    }

    function socialSignin(provider) {
        LoginService.socialSignin(provider)
            .then(onValidLogin, onErrorInLogin);

      }

      function socialSignup(provider) {
        LoginService.socialSignup(provider)
            .then(onValidLogin, onErrorInLogin);

      }

      var onValidLogin = function(response){
        onLogin();
        vm.username = response.data || vm.username;
      };

      var onErrorInLogin = function(rejection){
        vm.error = rejection.data;
        $rootScope.$broadcast('logout');

      };

      vm.username = '';
      vm.error = '';
      vm.signin = signin;
      vm.signout = signout;
      vm.socialSignup = socialSignup;
      vm.socialSignin = socialSignin;

  })

  .controller('signupCtrl', function ($state, $rootScope, LoginService) {
        var vm = this;

        vm.signup = signup;

        function signup(){
          vm.errorMessage = '';

          LoginService.signup(vm.firstName, vm.lastName, vm.email, vm.password, vm.again)
              .then(function (response) {
                // success
                onLogin();
              }, function (reason) {
                if(reason.data.error_description !== undefined){
                  vm.errorMessage = reason.data.error_description;
                }
                else{
                  vm.errorMessage = reason.data;
                }
              });
        }


        function onLogin() {
          $rootScope.$broadcast('authorized');
          $state.go('menu.login');
        }


        vm.email = '';
        vm.password ='';
        vm.again = '';
        vm.firstName = '';
        vm.lastName = '';
        vm.errorMessage = '';
      })

.controller('myAccountCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('moviesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('tVShowsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('favouritesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
