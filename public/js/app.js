'use strict';

const discoverMeApp = angular.module('discoverMeApp', [
  'ngRoute',
  'discoverMeControllers'
]);

discoverMeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/dashboard.html',
        controller: 'HostScanCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
