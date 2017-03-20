angular.module('app.routes', [])

.config(['$stateProvider', '$urlRouterProvider','$ionicConfigProvider',function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.navBar.alignTitle('center');

    $stateProvider

    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'appController'
    })

    .state('login', {
      url: '/login',
      templateUrl: "templates/login.html",
      controller: "loginController"
    })

    .state('signup', {
      url: '/signup',
      templateUrl: "templates/signup.html",
      controller: "signupController"
    })

    .state('reset', {
      url: '/reset',
      templateUrl: "templates/resetemail.html",
      controller: "resetController"
    })



    .state('menu.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('menu.myAccount', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'templates/myAccount.html',
        controller: 'myAccountCtrl'
      }
    }
  })

  .state('menu.movies', {
    url: '/movies',
    views: {
      'menuContent': {
        templateUrl: 'templates/movies.html',
        controller: 'moviesCtrl'
      }
    }
  })

  .state('menu.movieDetails', {
    url: '/movieDetails?movieID',
    views: {
      'menuContent': {
    templateUrl: 'templates/movieDetails.html',
    controller: 'movieDetailsCtrl'
  }
}
  })

  .state('menu.tVShows', {
    url: '/tvshows',
    views: {
      'menuContent': {
        templateUrl: 'templates/tVShows.html',
        controller: 'tVShowsCtrl'
      }
    }
  })

  .state('menu.favourites', {
    url: '/favourites',
    views: {
      'menuContent': {
        templateUrl: 'templates/favourites.html',
        controller: 'favouritesCtrl'
      }
    }
  })

    $urlRouterProvider.otherwise('/login');

}])
