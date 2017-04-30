(function loadRecipeCardDirective() {
  angular
    .module('app.recipes')
    .directive('recipeCard', recipeCard);

  recipeCard.$inject = ['$uibModal', '$http', '$location'];

  function recipeCard($uibModal, $http, $location) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipe: '=',
        mashPoints: '=',
      },
      templateUrl: 'recipes/recipe-card.tpl.html',
      link: function recipeCardController($scope) {
        $scope.edit = edit;
        $scope.launch = launch;

        $scope.properties = [
          { header: 'Number of Batches', name: 'number_of_batches' },
          { header: 'Last Brewed', name: 'last_brewed' },
        ];

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
              recipe: $scope.recipe,
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
      },
    };
  }
}());
