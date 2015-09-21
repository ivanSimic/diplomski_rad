'use strict';

angular.module('diplomskiApp').controller('RegisterCtrl', function($scope, alert, $auth) {
  $scope.submit = function() {


    $auth.signup({
      email: $scope.email,
      password: $scope.password
    })
      .then(function(res) {
        alert('Good', 'Dobrodošli', 'Hvala na registraciji' + res.data.user.email + '!Molimo aktivirajte Vaš profil preko emaila');
      })
      .catch(function(err) {
        alert('warning', 'Neces razbojnice', err.message);
      });

  };

});
