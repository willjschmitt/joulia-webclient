(function loadRecipeCardDirective() {
  angular
    .module('app.recipes')
    .directive('recipeCard', recipeCard);

  recipeCard.$inject = [
    '$uibModal', '$http', '$location', 'breweryResources', 'recipeInstances',
    'recipeCalculations'];

  function recipeCard(
      $uibModal, $http, $location, breweryResources, recipeInstances,
      recipeCalculations) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        /**
         * The brewery.Recipe object that this card will display in the card.
         */
        recipe: '=',

        /**
         * The array of recipes $scope.recipe is a part of. Used for removing
         * the recipe from the array if the card deletes it.
         */
        recipes: '=',

        /**
         * The style used for this recipe, so the parent controller can query
         * all styles rather than every card querying them.
         */
        style: '=',
      },
      templateUrl: 'recipes/recipe-card.tpl.html',
      link: function recipeCardController($scope) {
        $scope.launch = launch;
        $scope.remove = remove;
        $scope.srmToRGBString = recipeCalculations.srmToRGBString;

        /**
         * Launches modal to ask user for input to select a brewing system to launch
         * the provided recipe on it. If the modal returns successfully, sends the
         * request to the server to start.
         *
         * @returns The created modal instance.
         */
        function launch() {
          const modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'recipes/launch-recipe-modal.tpl.html',
            controller: 'LaunchRecipeModalController',
          });

          modalInstance.result
            .then(result => performLaunch($scope.recipe, result));

          return modalInstance;
        }

        /**
         * Deletes the recipe and removes it from the parent array.
         */
        function remove() {
          const index = $scope.recipes.indexOf($scope.recipe);
          $scope.recipe.$delete(() => $scope.recipes.splice(index, 1));
        }

        /**
         * Sends request to the server with the recipe ID to launch and the
         * brewhouse ID to it on. Navigates to the brewhouse page for the brewhouse
         * the recipe has been launched on, if the server returns successfully.
         * @param {object} recipe             Recipe to be launched.
         * @param {object} launchRecipeResult Result from the launchRecipe modal.
         */
        function performLaunch(recipe, launchRecipeResult) {
          recipeInstances.launch(recipe.id, launchRecipeResult.brewhouse.id)
            .then(navigateToBrewhouse);

          function navigateToBrewhouse() {
            $location
              .path(`/brewhouse/${launchRecipeResult.brewhouse.id}`)
              .replace();
          }
        }
      },
    };
  }
}());
