(function () {
'use strict';

const discoverMeFactories = angular.module('discoverMeFactories', []);

discoverMeFactories.factory('DatabaseFact', ['$http',
  function($http) {

    let scans = '';
    const factory = {};


    factory.refreshScans = () => {
      // AJAX call to node server
      $http({
        method: 'GET',
        url: '/scans/load'
      })
      .then( function success(res) {
        scans = res.data;
      }, function error(err) {
        if (err) throw err;
      });

      return scans;
    };


    return factory;

}]);

}());
