var Passport = angular.module('Passport', [
    'ngResource', 'Passport.filters', 'Passport.services', 'Passport.directives', 'Passport.controllers', 'webStorageModule'
  ]).config([
    '$routeProvider', '$rootScopeProvider', function($routeProvider)
    {
      'use strict';
      $routeProvider.when('/admin/events', {
          templateUrl: '/partials/admin/events.html',
          controller: 'EventsCtrl'
        }).when('/admin/event/:eventId', {
          templateUrl: '/partials/admin/event.html',
          controller: 'EventCtrl'
        }).when('/event/:eventId', {
          templateUrl: '/partials/eventQR.html',
          controller: 'EventQRCtrl'
        }).when('/ev/:eventId', {
          templateUrl: '/partials/lead/lead.html',
          controller: 'LeadCtrl'
        }).when('/lead/confirmation', {
          templateUrl: '/partials/lead/confirmation.html',
          controller: 'ConfirmationCtrl'
        }).otherwise({
          redirectTo: '/admin/events'
        });
    }
  ]).run(['$rootScope', function($rootScope)
  {
    'use strict';
    $('footer').show();
    $rootScope.errors = [];
    $rootScope.successes = [];
    $rootScope.notices = [];
    $('.alertArea').show();
  }
  ]);
