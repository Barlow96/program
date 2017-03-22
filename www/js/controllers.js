angular.module('app.controllers', [])

  .controller('loginController', ['$scope', '$firebaseArray', 'CONFIG', '$document', '$state', '$ionicPopup', '$ionicLoading', function($scope, $firebaseArray, CONFIG, $document, $state, $ionicPopup, $ionicLoading) {



    // Perform the login action when the user submits the login form
    $scope.doLogin = function(userLogin) {

      console.log(userLogin);
      $scope.showPopup = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: errorText
        });
        alertPopup.then(function(res) {

        })
      };

      if ($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != "") {


        firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function() {
          // Sign-In successful.
          //console.log("Login successful");

          var user = firebase.auth().currentUser;

          var name, email, uid;

          if (user.emailVerified) { //check for verification email confirmed by user from the inbox

            console.log("email verified");
            $ionicLoading.show({
              template: 'Logging In',
              duration: 3000
            })

            $state.go("menu.home");

            name = user.displayName;
            localStorage.setItem("loggedInUser", name)

            $scope.name = name;
            console.log(name);
            email = user.email;
            console.log(email);
            uid = user.uid;
            console.log(uid);

            //console.log(name + "<>" + email + "<>" +  photoUrl + "<>" +  uid);

          } else {

            errorText = 'Email not verified, please check your inbox or spam messages';
            $scope.showPopup();
            return false;

          } // end check verification email


        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          var errorText;

          console.log(errorCode);
          if (errorCode === 'auth/invalid-email') {
            errorText = "Invalid Email";
            $scope.showPopup();
            return false;
          } else if (errorCode === 'auth/wrong-password') {
            errorText = "Incorrect password";
            $scope.showPopup();
            return false;
          } else if (errorCode === 'auth/argument-error') {
            errorText = "Incorrect password";
            $scope.showPopup();
            return false;
          } else if (errorCode === 'auth/user-not-found') {
            errorText = "Email not found";
            $scope.showPopup();
            return false;
          } else if (errorCode === 'auth/too-many-requests') {
            errorText = "Too many failed login attempts, please try after sometime";
            $scope.showPopup();
            return false;
          } else if (errorCode === 'auth/network-request-failed') {
            errorText = "Request timed out, please try again";
            $scope.showPopup();
            return false;
          } else {
            alert(errorMessage);
            return false;
          }
        });



      } else {

        errorText = 'Please enter email and password';
        $scope.showPopup();
        return false;

      } //end check client username password


    }; // end $scope.doLogin()

  }])

  .controller('appController', ['$scope', '$firebaseArray', 'CONFIG', '$document', '$state','$ionicLoading', function($scope, $firebaseArray, CONFIG, $document, $state, $ionicLoading) {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

      $document[0].getElementById("username").textContent= localStorage.getItem("loggedInUser");


      } else {
        // No user is signed in.
        $state.go("login");
      }
    });


    $scope.doLogout = function() {

      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        //console.log("Logout successful");
        $ionicLoading.show({
          template: 'Logging Out',
          duration: 3000
        })
        $state.go("login");

      }, function(error) {
        // An error happened.
        console.log(error);
      });

    } // end dologout()



  }])

  .controller('resetController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG', function($scope, $state, $document, $firebaseArray, CONFIG) {

    $scope.doResetemail = function(userReset) {



      //console.log(userReset);

      if ($document[0].getElementById("ruser_name").value != "") {


        firebase.auth().sendPasswordResetEmail(userReset.rusername).then(function() {
          // Sign-In successful.
          //console.log("Reset email sent successful");

          $state.go("login");


        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);


          if (errorCode === 'auth/user-not-found') {
            alert('No user found with provided email.');
            return false;
          } else if (errorCode === 'auth/invalid-email') {
            alert('Email you entered is not complete or invalid.');
            return false;
          }

        });



      } else {

        alert('Please enter registered email to send reset link');
        return false;

      } //end check client username password


    }; // end $scope.doSignup()



  }])



  .controller('signupController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG', '$ionicPopup', function($scope, $state, $document, $firebaseArray, CONFIG, $ionicPopup) {

    $scope.doSignup = function(userSignup) {



      //console.log(userSignup);

      if ($document[0].getElementById("cuser_name").value != "" && $document[0].getElementById("cuser_pass").value != "") {


        firebase.auth().createUserWithEmailAndPassword(userSignup.cusername, userSignup.cpassword).then(function() {
          // Sign-In successful.
          //console.log("Signup successful");

          var user = firebase.auth().currentUser;

          user.sendEmailVerification().then(function(result) {

          }, function(error) {
            console.log(error)
          });

          user.updateProfile({
            displayName: userSignup.displayname,
          }).then(function() {

              var alertPopup = $ionicPopup.alert({
                title: 'Success',
                template: 'Account Created'
              });
              alertPopup.then(function(res) {

              });
            $state.go("login");
          }, function(error) {
            // An error happened.
            console.log(error);
          });




        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);

          if (errorCode === 'auth/weak-password') {
            alert('Password is weak, choose a strong password.');
            return false;
          } else if (errorCode === 'auth/email-already-in-use') {
            alert('Email you entered is already in use.');
            return false;
          }




        });



      } else {

        alert('Please enter email and password');
        return false;

      } //end check client username password


    }; // end $scope.doSignup()



  }])

  .controller('movieDetailsCtrl', ['$location', '$http', '$scope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($location, $http, $scope) {

      var movieID = $scope.movieID;
      $scope.movieID = $location.search();
      $scope.movieid = $scope.movieID["movieID"]


      var apiKey = '7baae7b093159f1876fbe91176adcb32';
      var movieDetailEndpoint = "https://api.themoviedb.org/3/movie/";
      var movieID = $scope.movieid;

      // creating a function for getting the movie list. we use this function when loading next page is needed
      $scope.getMovieDetails = function() {

        var url = movieDetailEndpoint + movieID + '?api_key=' + apiKey; // generating the url
        $scope.movieDetails = [];
        console.log(url);
        $http({

            method: 'GET',
            url: url

          })
          .then(function(response) {
            $scope.poster = response.data.poster_path;
            $scope.moviename = response.data.title;
            $scope.overview = response.data.overview;
          })
      }

      $scope.getMovieDetails();
    }
  ])

  .controller('searchCtrl', ['$http', '$scope',
    function($http, $scope, $state) {

      $scope.searchTerm = "";
      var apiKey = '7baae7b093159f1876fbe91176adcb32';
      var searchMoviesEndpoint = "https://api.themoviedb.org/3/search/movie/";
      var page = 0;

      $scope.movieList = [];

      // creating a function for getting the movie list. we use this function when loading next page is needed
      $scope.getMovieList = function() {

        var url = searchMoviesEndpoint + '?api_key=' + apiKey + '&query=' + $scope.searchTerm; // generating the url

        $http({
          method: 'GET',
          url: url
        }).
        success(function(data, status, headers, config) {

          if (status == 200) {
            $scope.movieList.push.apply($scope.movieList, data.results) // appending new movies to current list
            console.log(url);
          } else {
            console.error('Error happened while getting the movie list.')
          }

        }).
        error(function(data, status, headers, config) {
          console.error('Error happened while getting the movie list.')
        });
        $scope.movieList = [];
      }

      $scope.search = function() {
        console.log($scope.searchTerm);
        $scope.searchTerm = $scope.search.term;

        $scope.getMovieList();
      }

    }
  ])



  .controller('moviesCtrl', ['$scope', '$http',
    function($scope, $http, $state) {

      var apiKey = '7baae7b093159f1876fbe91176adcb32';
      var popularMoviesEndpoint = "https://api.themoviedb.org/3/movie/popular";
      var page = 0;

      $scope.movieList = [];

      // creating a function for getting the movie list. we use this function when loading next page is needed
      $scope.getMovieList = function() {

        var url = popularMoviesEndpoint + '?page=' + ++page + '&api_key=' + apiKey; // generating the url

        $http({
          method: 'GET',
          url: url
        }).
        success(function(data, status, headers, config) {

          if (status == 200) {
            page = data.page; // saving current page for pagination
            $scope.movieList.push.apply($scope.movieList, data.results) // appending new movies to current list
            console.log($scope.movieList);
          } else {
            console.error('Error happened while getting the movie list.')
          }

        }).
        error(function(data, status, headers, config) {
          console.error('Error happened while getting the movie list.')
        });
      }

      $scope.getMovieList(); // calling the function when script is loaded for the first time

    }
  ])

  .controller('myAccountCtrl', ['$scope', '$firebaseArray', 'CONFIG', function($scope, $firebaseArray, CONFIG) {
    // TODO: Show profile data

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('signed in')
    var user = firebase.auth().currentUser;
    console.log(user);

    email = user.email;
    $scope.email = email;

    username = user.displayName;
    $scope.username = username;

  } else {
    console.log(' No user is signed in')
  }
});

  }
])

.controller('tvShowsCtrl', ['$scope', '$http',
  function($scope, $http, $state) {

    var apiKey = '7baae7b093159f1876fbe91176adcb32';
    var popularTVEndpoint = "https://api.themoviedb.org/3/tv/popular";
    var page = 0;

    $scope.tvList = [];

    // creating a function for getting the movie list. we use this function when loading next page is needed
    $scope.getTvList = function() {

      var url = popularTVEndpoint + '?page=' + ++page + '&api_key=' + apiKey; // generating the url

      $http({
        method: 'GET',
        url: url
      }).
      success(function(data, status, headers, config) {

        if (status == 200) {
          page = data.page; // saving current page for pagination
          $scope.tvList.push.apply($scope.tvList, data.results) // appending new movies to current list
          console.log($scope.tvList);
        } else {
          console.error('Error happened while getting the tv list.')
        }

      }).
      error(function(data, status, headers, config) {
        console.error('Error happened while getting the tv list.')
      });
    }

    $scope.getTvList(); // calling the function when script is loaded for the first time

  }
])

.controller('tvDetailsCtrl', ['$location', '$http', '$scope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($location, $http, $scope) {

    var tvID = $scope.tvID;
    $scope.tvID = $location.search();
    $scope.tvid = $scope.tvID["tvID"]


    var apiKey = '7baae7b093159f1876fbe91176adcb32';
    var tvDetailEndpoint = "https://api.themoviedb.org/3/tv/";
    var tvID = $scope.tvid;

    // creating a function for getting the movie list. we use this function when loading next page is needed
    $scope.getTvDetails = function() {

      var url = tvDetailEndpoint + tvID + '?api_key=' + apiKey; // generating the url
      $scope.tvDetails = [];
      console.log(url);
      $http({

          method: 'GET',
          url: url

        })
        .then(function(response) {
          $scope.poster = response.data.poster_path;
          $scope.tvname = response.data.name;
          $scope.overview = response.data.overview;
          $scope.seasons = response.data.number_of_seasons;
        })
    }

    $scope.getTvDetails2 = function() {

      var url = 'https://api.themoviedb.org/3/tv/1399/season/1?api_key=7baae7b093159f1876fbe91176adcb32' // generating the url
      $scope.tvDetails = [];
      console.log(url);
      $http({

          method: 'GET',
          url: url

        })
        .then(function(response) {
          $scope.texts = response.data.episodes[0].name;
        })
    }

    $scope.getTvDetails();
    $scope.getTvDetails2();
  }
])


  .controller('homeCtrl', ['$scope', '$firebaseArray', 'CONFIG', function($scope, $firebaseArray, CONFIG) {
    // TODO: Show profile data


  }]);
