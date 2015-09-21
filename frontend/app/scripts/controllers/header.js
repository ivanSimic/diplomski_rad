'use strict';

angular.module('diplomskiApp')
  .controller('HeaderCtrl', function ($scope, $auth) {
   $scope.isAuthenticated = $auth.isAuthenticated;
  });
