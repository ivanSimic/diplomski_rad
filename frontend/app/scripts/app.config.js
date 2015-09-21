'use strict';

angular.module('diplomskiApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

  $authProvider.google({
    clientId: '1003399991369-64ov9k0ptfekf9d2e76gajfpiabbu7d6.apps.googleusercontent.com',
    url: API_URL + 'auth/google'

  });
    $authProvider.facebook({
    clientId: '497911720378398',
    url: API_URL + 'auth/facebook'

  });

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('main', {
    url: '/',
    templateUrl: '/views/main.html'

  })
    .state('kupi', {
      url: '/kupi',
      templateUrl: '/views/kupi.html',
      controller: 'KupiCtrl'

    })
    .state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'

    })
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'


    })
    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'


    });

  $authProvider.loginUrl = API_URL + 'login';
  $authProvider.signupUrl = API_URL + 'register';


  $httpProvider.interceptors.push('authInterceptor');


})

.constant('API_URL', 'http://localhost:3000/')

.run(function($window) {
  var params = $window.location.search.substring(1);
  if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
    var pair = params.split('=');
    var code = decodeURIComponent(pair[1]);

    $window.opener.postMessage(code, $window.location.origin);



  }
});
