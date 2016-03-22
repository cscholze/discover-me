const discoverMeControllers = angular.module('discoverMeControllers', []);

discoverMeControllers.controller('DashboardCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.discoveryResults = {};

      $scope.discover = () => {
        // GET IPs FOR NETWORK NEIGHBORS
        $http({
          method: 'GET',
          url: '/scan/discover'
        })
        .then(function success(res) {
            for (const host in res.data) {
              $scope.discoveryResults[res.data[host]] = {
                ports: []
              };
            }
          }, function error(err) {
            if (err) throw err;
          });
      };

      // GET PORTS AND SERVICES FOR SPECIFIC HOST
      $scope.scanHost = (event) => {
        const hostToScan = event.target.parentElement.getAttribute('host');
        const scanBtnElem = event.target.parentElement;

        $http({
          method: 'GET',
          url: `/scan/host/${hostToScan}`
        })
        .then(function success(res) {
          console.log('SCANNED: ',res.data);

          if (typeof res.data[hostToScan].host === "undefined") {
            console.log("NO HOST OBJECT", res.data[hostToScan]);
            return;
          }

          // If exists, attach hostname to discoveryResults object
          if (typeof res.data[hostToScan].host[0].hostnames[0] !== "string") {
            $scope.discoveryResults[hostToScan].hostname = res.data[hostToScan].host[0].hostnames[0].hostname[0].item.name;
            console.log($scope.discoveryResults[hostToScan].hostname);
          }

          const portsData = res.data[hostToScan].host[0].ports[0].port;


          if (typeof portsData === "undefined") {
            return "No Open Ports";
          }

          $scope.discoveryResults[hostToScan].ports = [];
          for (const port in portsData) {
             $scope.discoveryResults[hostToScan].ports.push({
               portid:  portsData[port].item.portid,
               protocol: portsData[port].item.protocol,
               serviceName: portsData[port].service[0].item.name || "not found"
             });
          }

          console.log($scope.discoveryResults);


        }, function error(err) {
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

