(function loadRecipeCardDirective() {
  angular
    .module('app.recipes')
    .directive('recipeCard', recipeCard);

  recipeCard.$inject = [
    '$uibModal', '$http', '$location', 'breweryResources', 'recipeInstances'];

  function recipeCard(
      $uibModal, $http, $location, breweryResources, recipeInstances) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipe: '=',
        recipes: '=',
        style: '=',
        mashPoints: '=',
      },
      templateUrl: 'recipes/recipe-card.tpl.html',
      link: function recipeCardController($scope) {
        $scope.edit = edit;
        $scope.launch = launch;
        $scope.remove = remove;

        /**
         * Laucnhes edit modal for this current recipe.
         *
         * @returns The created modal instance.
         */
        function edit() {
          const modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'recipes/edit-recipe-modal.tpl.html',
            controller: 'EditRecipeModalController',
            resolve: {
              recipe: function resolveRecipe() { return $scope.recipe; },
              mashPoints: function resolveMashPoints() {
                return $scope.mashPoints;
              },
              brewingCompany: function resolveBrewingCompany() { return null; },
            },
          });

          return modalInstance;
        }

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

        function srmColorStyle(srm) {
          return `background: red`;
        }
      },
    };
  }
}());
