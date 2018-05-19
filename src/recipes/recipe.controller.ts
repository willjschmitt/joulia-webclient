import _ = require('underscore');

import 'circularProgress';

RecipeController.$inject = [
  '$scope', '$stateParams', 'breweryResources', 'recipeCalculations'];

export function RecipeController(
    $scope, $stateParams, breweryResources, recipeCalculations) {
  $scope.recipe = breweryResources.Recipe.get(
    { id: $stateParams.recipeId }, recipeUpdated);

  $scope.beerStyleSearch = breweryResources.BeerStyleSearch;
  $scope.beerStyleHTML = '<div>{{ name }}</div>';

  function recipeUpdated() {
    doneLoading();
    if ($scope.recipe.style) {
      $scope.style = breweryResources.BeerStyle.get(
          { id: $scope.recipe.style });
    }
    $scope.mashPoints = breweryResources.MashPoint.query(
        { recipe: $scope.recipe.id });
    $scope.maltIngredientAdditions
        = breweryResources.MaltIngredientAddition.query(
            { recipe: $scope.recipe.id });
    $scope.bitteringIngredientAdditions
        = breweryResources.BitteringIngredientAddition.query(
            { recipe: $scope.recipe.id });
  }

  function doneLoading() {
    $('#attributes-loading').circularProgress('hide');
  }

  $scope.srmToRGBString = recipeCalculations.srmToRGBString;

  // Makes the resources available to pass into child elements for
  // ingredient-additions.
  $scope.breweryResources = breweryResources;

  $scope.save = save;
  $scope.tabSelected = {
    recipe_properties: true,
    malt_ingredients: false,
    bittering_ingredients: false,
  };
  $scope.selectTab = selectTab;

  $scope.mashIngredientHTML = `
    <div>{{ name }}</div>
    <small>
      SG Contribution: {{ potential_sg_contribution }}
    </small>`;

  $scope.bitteringIngredientHTML = `
    <div>{{ name }}</div>
    <small>
      Alpha Acid: {{ alpha_acid_weight * 100 | number : 2 }}%
    </small>`;

  /**
   * Saves recipe to server.
   */
  function save() {
    $('#attributes-loading').circularProgress('show');
    $scope.recipe.$update(doneLoading, doneLoading);
  }

  /* Sets the key `tabToSelect` to true in `$scope.tabSelected`, and sets all
   * other keys to false.
   */
  function selectTab(tabToSelect) {
    _.each($scope.tabSelected, function unselectTab(value, key) {
      $scope.tabSelected[key] = false;
    });
    $scope.tabSelected[tabToSelect] = true;
  }
}
