'use strict';


angular.module('diplomskiApp')
  .controller('LogoutCtrl', function ($auth, $state) {
    $auth.logout();
    $state.go('main');
    
  });
