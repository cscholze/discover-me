(function () {
'use strict';

const discoverMeControllers = angular.module('discoverMeControllers', ['discoverMeFactories']);

discoverMeControllers.controller('DashboardCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.recentSave = true;
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

        $http({
          method: 'GET',
          url: `/scan/host/${hostToScan}`
        })
        .then(function success(res) {
          $scope.discoveryResults[hostToScan] = {};

          // If no host key on results from host scan
          if (typeof res.data[hostToScan].host === "undefined") {
            $scope.discoveryResults[hostToScan].scanStatus = "HOST DOWN";
            $scope.discoveryResults[hostToScan].ports = [];
            $scope.recentSave=false;
            return;
          }

          // If hostname exists, attach hostname to discoveryResults object
          if (typeof res.data[hostToScan].host[0].hostnames[0] !== "string") {
            $scope.discoveryResults[hostToScan].hostname = res.data[hostToScan].host[0].hostnames[0].hostname[0].item.name;
          }

          // If no ports, only extra ports, key...
          const portsData = res.data[hostToScan].host[0].ports[0].port;
          if (typeof portsData === "undefined") {
            $scope.discoveryResults[hostToScan].scanStatus = "NO OPEN PORTS";
            $scope.discoveryResults[hostToScan].ports = [];
            $scope.recentSave = false;
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
          $scope.recentSave = false;

        }, function error(err) {
            $scope.discoveryResults[hostToScan].loading = false;
            console.log('error discovering');

            if (err) throw err;
        });
      };

      // SAVE SCAN
      $scope.saveScan = (event) => {

        const scanData = Object.assign({}, $scope.discoveryResults);

        // Only save hosts that have been scanned, alert user if none have been scanned
        for (const host in scanData) {
          // remove hosts that have not been scanned
          if (!scanData[host].hasOwnProperty('scanStatus')) {
            delete scanData[host];
          }

          // alert user if no hosts scanned
          if (Object.keys(scanData).length === 0) {
            window.alert('no scanned hosts to save, please scan host(s)');
            return new Error('No hosts have been scanned');
          }
        }

        // pass data with $http post
        $http({
          method: 'POST',
          url: '/scan/save',
          data: scanData,
          headers: {'Content-Type': 'application/json'}
          })
          .then( function success(res) {
            $scope.recentSave = true;
          }, function error(err) {
            if (err) throw err;
          });

      };
  }
]);

discoverMeControllers.controller('ViewScansCtrl', ['$scope', 'DatabaseFact', '$mdDialog',
  function ($scope, DatabaseFact, $mdDialog) {
    // refresh scans on initial view load
    DatabaseFact.refreshScans(function(res) {
      $scope.scans = res;
    });

    $scope.initDelete = false;

    $scope.refreshScans = () => {
      DatabaseFact.refreshScans(function(res) {
         $scope.scans = res;
      });
    };

    $scope.showScanDialog = (scan) => {
      $scope.scanViewed = scan;
      $mdDialog.show({
        clickOutsideToClose: false,
        scope: $scope,        // use parent scope in template
        preserveScope: true,  // do not forget this if use parent scope
        templateUrl: 'partials/scan-dialog.html',
        controller: ['$scope', '$mdDialog', '$http', function DialogController($scope, $mdDialog, $http) {
          $scope.closeDialog = () => {
            $scope.initScanDelete = false;
            $mdDialog.hide();
          };

          $scope.deleteScan = () => {
            // send delete request to server.then...
            const scanNameToDelete = $scope.scanViewed.name;
            $http({
              method: 'DELETE',
              url: '/scan/delete',
              data: {scanNameToDelete},
              headers: {'Content-Type': 'application/json'}
            })
            .then( function success(res) {
              DatabaseFact.refreshScans(function(data) {
                $scope.scans = data;
              });
            }, function error(err) {
              if (err) throw err;
            });

            $scope.initScanDelete = false;
            $mdDialog.hide();
          };
        }]
     });
    };
  }
]);

discoverMeControllers.controller('GetStartedCtrl', ['$scope',
  function ($scope) {
    $scope.upcomingFeatures = [
      '- Ability to scan a specific host IP address',
      '- Ability to name a scan when saving',
      '- Order discovered host cards by IP address',
      '- Filter discovered hosts by IP address to find specific host',
      '- Include and populate card for user device during discovery scan',
      '- Scan open ports for known vulnerabilities using NSE',
      '- Add login feature so users can save, view, and delete only scans they have performed',
      '- Discovery result cards persist after changing views'
    ];
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

}());
