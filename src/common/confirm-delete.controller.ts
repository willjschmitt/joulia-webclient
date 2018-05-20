import angular = require('angular');

import 'angular-ui-bootstrap';

angular
  .module('app.common.confirm-delete', ['ui.bootstrap',])
  .controller('ConfirmDeleteController', ConfirmDeleteController);

ConfirmDeleteController.$inject = ['$scope', '$uibModalInstance', 'name'];

function ConfirmDeleteController($scope, $uibModalInstance, name) {
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.name = name;

  function ok() {
    $uibModalInstance.close();
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
