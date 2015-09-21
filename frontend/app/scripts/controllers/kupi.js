'use strict';

angular.module('diplomskiApp').controller('KupiCtrl', function ($scope, $http, API_URL, alert) {

    $http.get(API_URL + 'kupi').success(function (bonovi) {
        $scope.bon = bonovi;

    }).error(function (err) {
        alert('warning', 'Nemaš pristup', err.message);

    });

  });
