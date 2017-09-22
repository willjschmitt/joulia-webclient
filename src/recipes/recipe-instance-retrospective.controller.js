(function loadRecipeInstanceRetrospectiveController() {
  angular
    .module('app.recipes')
    .controller('RecipeInstanceRetrospectiveController',
                RecipeInstanceRetrospectiveController);

  RecipeInstanceRetrospectiveController.$inject = [
    '$scope', 'breweryResources', '$routeParams'];

  function RecipeInstanceRetrospectiveController(
      $scope, breweryResources, $routeParams) {
    $scope.recipeInstance = breweryResources.RecipeInstance.get(
        { id: $routeParams.recipeInstanceId }, handleRecipeInstance);

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
}());
