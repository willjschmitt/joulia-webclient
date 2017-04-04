(function loadRecipesController() {
  angular
    .module('app.recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = [
    'breweryResources', '$uibModal', '$http', '$location'];

  function RecipesController(breweryResources, $uibModal, $http, $location) {
    const vm = this;
    vm.recipes = [];
    vm.recipeProperties = [
      { header: 'Number of Batches', name: 'number_of_batches' },
      { header: 'Last Brewed', name: 'last_brewed' },
    ];
    updateRecipes();
    vm.launchRecipe = launchRecipe;
    vm.addRecipe = addRecipe;

    /**
     * Queries the server for a new list of recipes available.
     */
    function updateRecipes() {
      vm.recipes = breweryResources.Recipe.query();
    }

    /**
     * Launches modal to ask user for input to select a brewing system to launch
     * the provided recipe on it. If the modal returns successfully, sends the
     * request to the server to start.
     * @param {object} recipe The recipe object to launch.
     *
     * @returns The created modal instance.
     */
    function launchRecipe(recipe) {
      const modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'static/recipes/launch-recipe-modal.html',
        controller: 'LaunchRecipeModalController',
      });

      modalInstance.result.then(result => performLaunch(recipe, result));

      return modalInstance;
    }

    /**
     * Sends request to the server with the recipe ID to launch and the
     * brewhouse ID to it on. Navigates to the brewhouse page for the brewhouse
     * the recipe has been launched on, if the server returns successfully.
     * @param {object} recipe             Recipe to be launched.
     * @param {object} launchRecipeResult Result from the launchRecipe modal.
     */
    function performLaunch(recipe, launchRecipeResult) {
      $http({
        method: 'POST',
        url: 'brewery/brewhouse/launch',
        data: {
          recipe: recipe.id,
          brewhouse: launchRecipeResult.brewhouse.id,
        },
      }).then(navigateToBrewhouse);

      function navigateToBrewhouse() {
        $location
          .path(`/brewhouse/${launchRecipeResult.brewhouse.id}`)
          .replace();
      }
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
        templateUrl: 'static/recipes/add-recipe-modal.html',
        controller: 'AddRecipeModalController',
      });

      modalInstance.result.then(updateRecipes);

      return modalInstance;
    }
  }
}());
