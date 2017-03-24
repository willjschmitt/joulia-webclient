app
  .module("app.recipes", [])
  .controller('RecipesController', RecipesController);

RecipesController.$inject = [
    '$scope', 'breweryApi', '$uibModal', '$http', '$location'];

function($scope, breweryApi, $uibModal, $http, $location) {
  $scope.recipes = breweryApi.recipe.query();

  $scope.launch_recipe = function(recipe) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'static/brewery/html/launch-recipe-modal.html',
      controller: 'LaunchRecipeModalCtrl'
    });

    modalInstance.result.then(function (result) {
      $http({
        method: 'POST',
        url: '/brewery/brewhouse/launch',
        data: {
          recipe: recipe.id,
          brewhouse: result.brewhouse.id,
        }
      }).then(function(response) {
        $location.path('/brewhouse/' + result.brewhouse.id).replace();
      });
    });
  };

  $scope.addRecipe = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'static/brewery/html/add-recipe-modal.html',
      controller: 'addRecipeModalCtrl'
    });

    modalInstance.result.then(function (result) {
      $scope.recipes = breweryApi.recipe.query();
    });
  }

  $scope.recipe_properties = [
    {header: 'Number of Batches', name: 'number_of_batches'},
    {header: 'Last Brewed', name: 'last_brewed'}
  ];
}
