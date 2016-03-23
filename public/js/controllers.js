const discoverMeControllers = angular.module('discoverMeControllers', []);

discoverMeControllers.controller('DashboardCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.isDiscovering = false;
    $scope.discoveryResults = {};

      $scope.discover = () => {
        $scope.isDiscovering = true;
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

            $scope.isDiscovering = false;
          }, function error(err) {
            if (err) throw err;
          });
      };

      // GET PORTS AND SERVICES FOR SPECIFIC HOST
      $scope.scanHost = (event) => {

        // Get host to scan from DOM
        const hostToScan = event.target.parentElement.getAttribute('host');

        // Set loading to true, display loading circle
        $scope.discoveryResults[hostToScan].loading = true;
        console.log('Is loading? ', $scope.discoveryResults[hostToScan].loading);

        $http({
          method: 'GET',
          url: `/scan/host/${hostToScan}`
        })
        .then(function success(res) {
          $scope.discoveryResults[hostToScan] = {};
          console.log('SCANNED: ',res.data);

          // If no host key on results from host scan
          if (typeof res.data[hostToScan].host === "undefined") {
            $scope.discoveryResults[hostToScan].scanStatus = "HOST DOWN";
            $scope.discoveryResults[hostToScan].ports = [];
            console.log('no host key found: ', $scope.discoveryResults[hostToScan]);
            return;
          }

          // If hostname exists, attach hostname to discoveryResults object
          if (typeof res.data[hostToScan].host[0].hostnames[0] !== "string") {
            $scope.discoveryResults[hostToScan].hostname = res.data[hostToScan].host[0].hostnames[0].hostname[0].item.name;
            console.log("hostname: ",$scope.discoveryResults[hostToScan].hostname);
          }

          // If no ports, only extra ports, key...
          const portsData = res.data[hostToScan].host[0].ports[0].port;
          if (typeof portsData === "undefined") {
            $scope.discoveryResults[hostToScan].scanStatus = "NO OPEN PORTS";
            $scope.discoveryResults[hostToScan].ports = [];
            return;
          }

          // Populate ports, protocols, and services
          $scope.discoveryResults[hostToScan].scanStatus = "SUCCESS";
          $scope.discoveryResults[hostToScan].ports = [];
          for (const port in portsData) {
            // Get service name if available
            const serviceName = typeof portsData[port].service !== "undefined" ?
              portsData[port].service[0].item.name : "UNKNOWN";

             $scope.discoveryResults[hostToScan].ports.push({
               portid:  portsData[port].item.portid,
               protocol: portsData[port].item.protocol,
               serviceName: serviceName
             });
          }

          // Loading = false, hide loading progress circle
          $scope.discoveryResults[hostToScan].loading = false;

        }, function error(err) {
            if (err) throw err;
          });
      };

      // SAVE SCAN
      $scope.saveScan = (event) => {
        console.log('SAVE THIS: \n', $scope.discoveryResults);
        const scanData = $scope.discoveryResults;
        // pass data with $http post
        $http({
          method: 'POST',
          url: '/scan/save',
          data: scanData,
          headers: {'Content-Type': 'application/json'}
          }).then( function success(res) {


            console.log('RESPONSE\n', res);

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

