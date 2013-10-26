angular.module('Passport.controllers').controller('LoginCtrl', [
  '$scope', '$location','UserService', function($scope, $location, UserService)
  {
    "use strict";
    $scope.username = '';
    $scope.password = '';
    $scope.login = function() {
      UserService.login($scope.username, $scope.password, function(res)
      {
        $location.path('/route')
      });
    }
  }]);
