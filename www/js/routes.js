angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl as vm'
      }
    }
  })

  .state('menu.signup', {
    url: '/signup',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl as vm'
      }
    }
  })

  .state('menu.search', {
    url: '/search',
    views: {
      'side-menu21': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('menu.myAccount', {
    url: '/account',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myAccount.html',
        controller: 'myAccountCtrl'
      }
    }
  })

  .state('menu.movies', {
    url: '/movies',
    views: {
      'side-menu21': {
        templateUrl: 'templates/movies.html',
        controller: 'moviesCtrl'
      }
    }
  })

  .state('menu.movieDetails', {
    url: '/movieDetails?movieID',
    views: {
      'side-menu21': {
    templateUrl: 'templates/movieDetails.html',
    controller: 'movieDetailsCtrl'
  }
}
  })

  .state('menu.tVShows', {
    url: '/tvshows',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tVShows.html',
        controller: 'tVShowsCtrl'
      }
    }
  })

  .state('menu.favourites', {
    url: '/favourites',
    views: {
      'side-menu21': {
        templateUrl: 'templates/favourites.html',
        controller: 'favouritesCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/home')



});
