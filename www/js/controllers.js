angular.module('app.controllers', [])

.controller('loginController',['$scope', '$firebaseArray', 'CONFIG', '$document', '$state', function($scope, $firebaseArray, CONFIG, $document, $state) {



  // Perform the login action when the user submits the login form
  $scope.doLogin = function(userLogin) {

    console.log(userLogin);

    if($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != ""){


        firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function() {
          // Sign-In successful.
          //console.log("Login successful");

                    var user = firebase.auth().currentUser;

                    var name, email, photoUrl, uid;

                    if(user.emailVerified) { //check for verification email confirmed by user from the inbox

                      console.log("email verified");
                      $state.go("menu.home");

                      name = user.displayName;
                      email = user.email;
                      photoUrl = user.photoURL;
                      uid = user.uid;

                      //console.log(name + "<>" + email + "<>" +  photoUrl + "<>" +  uid);

                      localStorage.setItem("photo",photoUrl);

                    }else{

                        alert("Email not verified, please check your inbox or spam messages")
                        return false;

                    } // end check verification email


        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          if (errorCode === 'auth/invalid-email') {
             alert('Enter a valid email.');
             return false;
          }else if (errorCode === 'auth/wrong-password') {
             alert('Incorrect password.');
             return false;
          }else if (errorCode === 'auth/argument-error') {
             alert('Password must be string.');
             return false;
          }else if (errorCode === 'auth/user-not-found') {
             alert('No such user found.');
             return false;
          }else if (errorCode === 'auth/too-many-requests') {
             alert('Too many failed login attempts, please try after sometime.');
             return false;
          }else if (errorCode === 'auth/network-request-failed') {
             alert('Request timed out, please try again.');
             return false;
          }else {
             alert(errorMessage);
             return false;
          }
        });



    }else{

        alert('Please enter email and password');
        return false;

    }//end check client username password


  };// end $scope.doLogin()

}])

.controller('appController',['$scope', '$firebaseArray', 'CONFIG', '$document', '$state', function($scope, $firebaseArray, CONFIG, $document, $state) {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      $document[0].getElementById("photo_user").src = localStorage.getItem("photo");


    } else {
      // No user is signed in.
      $state.go("login");
    }
  });


  $scope.doLogout = function(){

      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        //console.log("Logout successful");
        $state.go("login");

      }, function(error) {
        // An error happened.
        console.log(error);
      });

}// end dologout()



}])

.controller('resetController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG', function($scope, $state, $document, $firebaseArray, CONFIG) {

$scope.doResetemail = function(userReset) {



    //console.log(userReset);

    if($document[0].getElementById("ruser_name").value != ""){


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
          }else if (errorCode === 'auth/invalid-email') {
             alert('Email you entered is not complete or invalid.');
             return false;
          }

        });



    }else{

        alert('Please enter registered email to send reset link');
        return false;

    }//end check client username password


  };// end $scope.doSignup()



}])



.controller('signupController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG', function($scope, $state, $document, $firebaseArray, CONFIG) {

$scope.doSignup = function(userSignup) {



    //console.log(userSignup);

    if($document[0].getElementById("cuser_name").value != "" && $document[0].getElementById("cuser_pass").value != ""){


        firebase.auth().createUserWithEmailAndPassword(userSignup.cusername, userSignup.cpassword).then(function() {
          // Sign-In successful.
          //console.log("Signup successful");

          var user = firebase.auth().currentUser;

          user.sendEmailVerification().then(function(result) { console.log(result) },function(error){ console.log(error)});

          user.updateProfile({
            displayName: userSignup.displayname,
            photoURL: userSignup.photoprofile
          }).then(function() {
            // Update successful.
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
          }else if (errorCode === 'auth/email-already-in-use') {
             alert('Email you entered is already in use.');
             return false;
          }




        });



    }else{

        alert('Please enter email and password');
        return false;

    }//end check client username password


  };// end $scope.doSignup()



}])

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
  //https://api.themoviedb.org/3/search/movie?api_key=###&query=tron
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


.controller('homeCtrl', ['$scope', '$firebaseArray', 'CONFIG', function($scope, $firebaseArray, CONFIG) {
// TODO: Show profile data


}]);
