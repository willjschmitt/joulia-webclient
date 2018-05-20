import angular = require('angular');
import '@uirouter/angularjs';

import '../common/brewery-resources.factory';
import '../brewhouse/brewhouse-measurements.directive';
import '../brewhouse/brewhouse-temperature-plots.directive';

angular
  .module('app.recipes.recipe-instance-retrospective-controller',
    [
      'ui.router',
      'app.common.brewery-resources',
      'app.brewhouse.measurements',
      'app.brewhouse.temperature-plots',
    ])
  .controller('RecipeInstanceRetrospectiveController', RecipeInstanceRetrospectiveController);

RecipeInstanceRetrospectiveController.$inject = [
  '$scope', 'breweryResources', '$stateParams'];

export function RecipeInstanceRetrospectiveController(
    $scope, breweryResources, $stateParams) {
  $scope.recipeInstance = breweryResources.RecipeInstance.get(
      { id: $stateParams.recipeInstanceId }, handleRecipeInstance);

  /**
   * Requests the recipe and brewhouse for this recipe instance.
   */
  function handleRecipeInstance() {
    updateRecipe();
    updateBrewhouse();
  }

  /**
   * Gets the brewhouse this recipe instance was brewed on.
   */
  function updateBrewhouse() {
    $scope.brewhouse = breweryResources.Brewhouse.get(
      { id: $scope.recipeInstance.brewhouse }, updateBrewery);
  }

  /**
   * Gets the brewery this brewhouse is a part of.
   */
  function updateBrewery() {
    $scope.brewery = breweryResources.Brewery.get({
      id: $scope.brewhouse.brewery,
    });
  }

  /**
   * Gets the recipe this instance attempted.
   */
  function updateRecipe() {
    $scope.recipe = breweryResources.Recipe.get({
      id: $scope.recipeInstance.recipe,
    });
  }
}
