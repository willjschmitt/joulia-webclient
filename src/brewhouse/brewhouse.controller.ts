import * as angular from 'angular';
import '@uirouter/angularjs';

import '../common/brewery-resources.factory';

angular
  .module('app.brewhouse.controller',
    [
      'ui.router',
      'app.common.brewery-resources',
    ])
  .controller('BrewhouseController', BrewhouseController);

BrewhouseController.$inject = ['$scope', 'breweryResources', '$stateParams'];

function BrewhouseController($scope, breweryResources, $stateParams) {
  $scope.brewhouse = breweryResources.Brewhouse.get(
      { id: $stateParams.brewhouseId }, updateBrewery);

  // TODO(willjschmitt): Make this configurable via url params, etc.
  $scope.historyTime = -60.0 * 15.0;  // 15 Minutes.

  /**
   * Gets the brewery this brewhouse is a part of.
   */
  function updateBrewery() {
    $scope.brewery = breweryResources.Brewery.get({
      id: $scope.brewhouse.brewery,
    });
    getRecipeInstance();
  }

  /**
   * Get's all recipe instances that are currently active for this brewhouse.
   */
   // TODO(will): Get this serialized by Brewhouse, since it's a property of
   // the Brewhouse anyways.
  function getRecipeInstance() {
    breweryResources.RecipeInstance.query({
      brewhouse: $scope.brewhouse.id,
      active: true,
    },
    result => loadRecipeInstance(result));
  }

  /**
   * Loads the recipe instance from the result of the query performed in
   * getRecipeInstance. If more than 1 are found, throws an error.
   *
   * @throws Error Throws error if more than one currently active recipe
   *     instance is found for this brewhouse.
   */
  function loadRecipeInstance(result) {
    if (result.length === 1) {
      $scope.recipeInstance = result[0];
    } else if (result.length === 0) {
      $scope.recipeInstance = null;
    } else {
      console.log('throwing error');
      throw new Error(
        'Multiple active recipe instance were found for this equipment, which'
        + ' should never happen.');
    }
  }
}
