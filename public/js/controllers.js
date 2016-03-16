const discoverMeControllers = angular.module('discoverMeControllers', []);

discoverMeControllers.controller('DashboardCtrl', ['$scope',
  function ($scope) {
    // Sidebar Navigation Controls
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };


    $scope.localhost = '127.0.0.1';
  }
]);

