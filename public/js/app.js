/* jshin esverion: 6 */
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
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
}());
