import angular = require('angular');

import 'angular-ui-bootstrap';

import '../../templates'
import '../../common/brewery-resources.factory';

LaunchRecipeModalController.$inject = ['breweryResources']

function LaunchRecipeModalController(breweryResources) {
  const $scope = this;

  $scope.brewhouses = breweryResources.Brewhouse.query();
  $scope.selectedBrewhouse = null;

  $scope.ok = ok;
  $scope.cancel = cancel;

  function ok() {
    $scope.close({ brewhouse: $scope.selectedBrewhouse });
  }

  function cancel() {
    $scope.dismiss({ reason: 'cancel' });
  }
}

angular
  .module('app.recipes.instance.launch-recipe-modal', [
    'ui.bootstrap',
    'app.templates',
    'app.common.brewery-resources',
  ])
  .component('launchRecipeModal', {
    templateUrl: 'recipes/instance/launch-recipe-modal.tpl.html',
    bindings: {
      close: '&',
      dismiss: '&',
    },
    controller: LaunchRecipeModalController,
  });
