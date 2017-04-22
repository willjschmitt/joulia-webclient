(function loadRecipesController() {
  angular
    .module('app.recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = ['$scope', 'breweryResources', '$uibModal'];

  function RecipesController(
      $scope, breweryResources, $uibModal) {
    $scope.recipes = [];
    updateRecipes();
    $scope.addRecipe = addRecipe;

    /**
     * Queries the server for a new list of recipes available.
     */
    function updateRecipes() {
      $scope.recipes = breweryResources.Recipe.query();
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
        templateUrl: 'recipes/add-recipe-modal.tpl.html',
        controller: 'AddRecipeModalController',
      });

      modalInstance.result.then(updateRecipes);

      return modalInstance;
    }
  }
}());
