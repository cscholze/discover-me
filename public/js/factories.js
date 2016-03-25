(function () {
'use strict';

const discoverMeFactories = angular.module('discoverMeFactories', []);

discoverMeFactories.factory('DatabaseFact', ['$http',
  function($http) {

    const factory = {};


    factory.refreshScans = (cb) => {
      $http({
        method: 'GET',
        url: '/scans/load'
      })
      .then( function success(res) {
        cb(res.data);
      }, function error(err) {
        if (err) throw err;
      });
    };


    return factory;

}]);

}());
