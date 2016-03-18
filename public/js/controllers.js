const discoverMeControllers = angular.module('discoverMeControllers', []);

discoverMeControllers.controller('DashboardCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.localhost = '127.0.0.1';

    $scope.discoveryResults = {
      upHosts: []
      };

      $scope.discover = () => {
        // Simple GET request example:
        $http({
          method: 'GET',
          url: '/scan/discover'
        })
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response.data);
            $scope.discoveryResults.upHosts = response.data;
          }, function errorCallback(err) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            if (err) throw err;
          });
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

