'use strict';

var app = angular
  .module('TaskNinjaApp', [
    'ngAnimate',    
    'ngResource',
    'ngRoute',
    // 'ngMaterial',    
    'firebase',
    'toaster',
    'angularMoment',
    'ui.calendar',
    // 'angularPayments',
    'ngMap',
  ])

  .constant('FURL', 'https://lastmiutemiracle.firebaseio.com/')  
  .run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the login page
      if (error === "AUTH_REQUIRED") {
        $location.path("/login");
      }
    });
  })  

  .config(function ($routeProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: 'views/browse.html', 
        controller: 'BrowseController'    
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      })

      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapController'
      })

        .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      }) 

      .when('/browse/:taskId', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController'     
      })

       .when('/dashboard', {
        templateUrl: 'views/dashboard.html', 
        controller: 'DashboardController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }   
      })

      .otherwise({
        redirectTo: '/'
      });
  });
