import angular = require('angular');

import 'angular-ui-bootstrap';

angular
  .module('app.recipes.end-recipe-modal', ['ui.bootstrap',])
  .controller('EndRecipeModalController', EndRecipeModalController);

EndRecipeModalController.$inject = ['$scope', '$uibModalInstance'];

function EndRecipeModalController($scope, $uibModalInstance) {
  $scope.ok = ok;
  $scope.cancel = cancel;

  function ok() {
    $uibModalInstance.close(true);
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
