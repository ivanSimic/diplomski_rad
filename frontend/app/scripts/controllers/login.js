'use strict';

angular.module('diplomskiApp').controller('LoginCtrl', function($scope, alert, auth, $auth) {
  $scope.submit = function() {


    $auth.login({
      email: $scope.email,
      password: $scope.password
    })
      .then(function(res) {
        var message = 'Dobrodošao natrag ' + res.data.user.email + '!!!';
        
        if(!res.data.user.active)
            message = 'Još nisi aktivirao profil, šta se čeka, idi na mail u napravi verifikaciju';
        
        alert('Good', 'Dobrodošao', message);
      })
      .catch(handleError);

  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider).then(function(res) {
      alert('Good', 'Dobrodošao', 'Dobrodošao natrag ' + res.data.user.displayName + '!!!');
    }, handleError);
  };

  function handleError(err) {
    alert('warning', ' Pogreška ??', err.message);

  }
});
