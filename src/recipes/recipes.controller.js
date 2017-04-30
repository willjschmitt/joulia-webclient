(function loadRecipesController() {
  angular
    .module('app.recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = ['$scope', 'breweryResources', '$uibModal'];

  function RecipesController(
      $scope, breweryResources, $uibModal) {
    $scope.recipes = [];
    $scope.mashPointsMap = {};
    updateRecipes();
    $scope.addRecipe = addRecipe;

    /**
     * Queries the server for a new list of recipes available.
     */
    function updateRecipes() {
      $scope.recipes = breweryResources.Recipe.query(updateMashPoints);
    }

    /**
     * Queries the server for all of the mashpoints. Should be called after
     * recipes are received, so recipes can be mapped to mash points.
     */
    function updateMashPoints() {
      breweryResources.MashPoint
        .query(mashPoints => mapRecipesToMashPoints(mashPoints));
    }

    /**
     * Resets the recipe to mash point map with empty arrays for all recipes,
     * then adds all mashpoints to the array in the map associated with its
     * recipe's primary key.
     */
    function mapRecipesToMashPoints(mashPoints) {
      _.each($scope.recipes, function resetRecipeInMap(recipe) {
        $scope.mashPointsMap[recipe.id] = [];
      });

      _.each(mashPoints, function addMashPointToMap(mashPoint) {
        $scope.mashPointsMap[mashPoint.recipe].push(mashPoint);
      });
    }

    /**
     * Launches modal to ask user for information about adding a new recipe to
     * be able to brew. Reloads recipes after successfully returning from the
     * modal.
     *
     * @returns The created modal instance.
     */
    function addRecipe() {
      const modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'recipes/edit-recipe-modal.tpl.html',
        controller: 'EditRecipeModalController',
        resolve: {
          recipe: undefined,
        },
      });

      modalInstance.result.then(updateRecipes);

      return modalInstance;
    }
  }
}());
