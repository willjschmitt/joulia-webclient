(function loadRecipeController() {
  angular
    .module('app.recipes')
    .controller('RecipeController', RecipeController);

  RecipeController.$inject = [
    '$scope', '$routeParams', 'breweryResources', 'recipeCalculations'];

  function RecipeController(
      $scope, $routeParams, breweryResources, recipeCalculations) {
    $scope.recipe = breweryResources.Recipe.get(
      { id: $routeParams.recipeId }, recipeUpdated);

    $scope.beerStyles = breweryResources.BeerStyle.query();

    function recipeUpdated() {
      doneLoading();
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
}());
