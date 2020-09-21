import * as angular from 'angular';

import 'angular-ui-bootstrap';

import '../common/brewery-resources.factory';

angular
  .module('app.recipes.launch-recipe-modal',
    [
      'ui.bootstrap',
      'app.common.brewery-resources',
    ])
  .controller('LaunchRecipeModalController', LaunchRecipeModalController);

LaunchRecipeModalController.$inject = [
  '$scope', '$uibModalInstance', 'breweryResources'];

function LaunchRecipeModalController(
    $scope, $uibModalInstance, breweryResources) {
  $scope.brewhouses = breweryResources.Brewhouse.query();
  $scope.selectedBrewhouse = null;

  $scope.ok = ok;
  $scope.cancel = cancel;

  function ok() {
    $uibModalInstance.close({ brewhouse: $scope.selectedBrewhouse });
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
