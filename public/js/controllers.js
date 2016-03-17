const discoverMeControllers = angular.module('discoverMeControllers', []);

discoverMeControllers.controller('DashboardCtrl', ['$scope',
  function ($scope) {
    $scope.localhost = '127.0.0.1';

    $scope.discoveryResults = {
      upHosts: [
        '192.168.0.1',
        '192.168.0.4',
        '192.168.0.24',
        '10.0.0.4',
        '10.0.0.5'
        ]
      };

  }
]);

discoverMeControllers.controller('SiteCtrl', ['$scope', '$mdSidenav',
  function ($scope, $mdSidenav) {
    // Sidebar Navigation Controls
    $scope.openMenu = function() {
      $mdSidenav('left').toggle();
    };
  }
]);

