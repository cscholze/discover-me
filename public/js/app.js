(function () {
'use strict';

const discoverMeApp = angular.module('discoverMeApp', [
  'discoverMeControllers',
  'ngMaterial',
  'ngRoute',
]);

discoverMeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/getting-started.html',
        controller: 'GetStartedCtrl'
      }).
      when('/dashboard', {
        templateUrl: '/partials/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      when('/view-scans', {
        templateUrl: 'partials/view-scans.html',
        controller: 'ViewScansCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);


}());
