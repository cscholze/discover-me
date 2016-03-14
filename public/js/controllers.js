const discoverMeControllers = angular.module('discoverMeControllers', []);

discoverMeControllers.controller('HostScanCtrl', ['$scope',
  function ($scope) {
    $scope.localhost = '127.0.0.1';
  }]);

