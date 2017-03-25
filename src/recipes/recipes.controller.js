(function loadRecipesController() {
  angular
    .module('app.recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = [
    '$scope', 'breweryResources', '$uibModal', '$http', '$location'];

  function RecipesController($scope, breweryResources, $uibModal, $http,
      $location) {
    $scope.recipes = breweryResources.Recipe.query();

    $scope.launchRecipe = launchRecipe;
    $scope.addRecipe = addRecipe;
    $scope.recipe_properties = [
      { header: 'Number of Batches', name: 'number_of_batches' },
      { header: 'Last Brewed', name: 'last_brewed' },
    ];

    function launchRecipe(recipe) {
      const modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'static/brewery/html/launch-recipe-modal.html',
        controller: 'LaunchRecipeModalCtrl',
      });

      modalInstance.result.then(performLaunch);

      function performLaunch(result) {
        $http({
          method: 'POST',
          url: '/brewery/brewhouse/launch',
          data: {
            recipe: recipe.id,
            brewhouse: result.brewhouse.id,
          },
        }).then(navigateToBrewhouse);

        function navigateToBrewhouse() {
          $location.path(`/brewhouse/${result.brewhouse.id}`).replace();
        }
      }
    }

    function addRecipe() {
      const modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'static/brewery/html/add-recipe-modal.html',
        controller: 'addRecipeModalController',
      });

      modalInstance.result.then(updateRecipes);
    }

    function updateRecipes() {
      $scope.recipes = breweryResources.recipe.query();
    }
  }
}());
