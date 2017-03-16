angular.module('app.controllers', [])

  .controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

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
    function($scope, $stateParams) {


    }
  ])

  .controller('movieDetailsCtrl', ['$location', '$http', '$scope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($location, $http, $scope) {

      var movieID = $scope.movieID;
       $scope.movieID = $location.search();
       $scope.movieid = $scope.movieID["movieID"]


       var apiKey = '7baae7b093159f1876fbe91176adcb32';
       var movieDetailEndpoint = "https://api.themoviedb.org/3/movie/";
       var movieID = $scope.movieid;

       // creating a function for getting the movie list. we use this function when loading next page is needed
       $scope.getMovieDetails = function () {

         var url = movieDetailEndpoint + movieID + '?api_key=' + apiKey; // generating the url
         $scope.movieDetails = [];
         console.log(url);
         $http({

           method: 'GET',
           url: url

         })
         .then(function (response) {
           $scope.poster = response.data.poster_path;
           $scope.moviename = response.data.title;
           $scope.overview = response.data.overview;
         })
       }

      $scope.getMovieDetails();
  }]
)

.controller('searchCtrl', ['$http', '$scope',
function ($http, $scope, $state) {

  $scope.searchTerm = "";
  var apiKey = '7baae7b093159f1876fbe91176adcb32';
  https://api.themoviedb.org/3/search/movie?api_key=###&query=tron
  var searchMoviesEndpoint = "https://api.themoviedb.org/3/search/movie/";
  var page = 0;

  $scope.movieList = [];

  // creating a function for getting the movie list. we use this function when loading next page is needed
  $scope.getMovieList = function () {

      var url = searchMoviesEndpoint + '?api_key=' + apiKey + '&query=' + $scope.searchTerm; // generating the url

      $http({method: 'GET', url: url}).
        success(function (data, status, headers, config) {

            if (status == 200) {
                $scope.movieList.push.apply($scope.movieList, data.results)   // appending new movies to current list
                console.log(url);
            } else {
                console.error('Error happened while getting the movie list.')
            }

        }).
        error(function (data, status, headers, config) {
            console.error('Error happened while getting the movie list.')
        });
  $scope.movieList = [];
  }

  $scope.search = function () {
    console.log($scope.searchTerm);
    $scope.searchTerm = $scope.search.term;

    $scope.getMovieList();
  }

}]
)



   .controller('moviesCtrl', ['$scope', '$http',
    function ($scope, $http, $state) {

        var apiKey = '7baae7b093159f1876fbe91176adcb32';
        var popularMoviesEndpoint = "https://api.themoviedb.org/3/movie/popular";
        var page = 0;

        $scope.movieList = [];

        // creating a function for getting the movie list. we use this function when loading next page is needed
        $scope.getMovieList = function () {

            var url = popularMoviesEndpoint + '?page=' + ++page + '&api_key=' + apiKey; // generating the url

            $http({method: 'GET', url: url}).
              success(function (data, status, headers, config) {

                  if (status == 200) {
                      page = data.page;                                             // saving current page for pagination
                      $scope.movieList.push.apply($scope.movieList, data.results)   // appending new movies to current list
                      console.log($scope.movieList);
                  } else {
                      console.error('Error happened while getting the movie list.')
                  }

              }).
              error(function (data, status, headers, config) {
                  console.error('Error happened while getting the movie list.')
              });
        }

        $scope.getMovieList();    // calling the function when script is loaded for the first time

    }]
)

  .controller('tVShowsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('favouritesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])
