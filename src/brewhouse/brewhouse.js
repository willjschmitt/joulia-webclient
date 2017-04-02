(function loadBrewhouseController() {
  angular
    .module('app.brewhouse')
    .controller('BrewhouseController', BrewhouseController);

  BrewhouseController.$inject = ['$scope', 'breweryApi', '$routeParams'];

  function BrewhouseController($scope, breweryApi, $routeParams) {
    $scope.brewhouse = breweryApi.Brewhouse.get(
        { id: $routeParams.brewhouseId }, updateBrewery);

    function updateBrewery() {
      $scope.brewery = breweryApi.Brewery.get({
        id: $scope.brewhouse.brewery,
      });
      getRecipeInstance();
    }

    function getRecipeInstance() {
      breweryApi.recipeInstance.query({
        brewhouse: $scope.brewhouse.id,
        active: 'True',
      },
      result => loadRecipeInstance(result), unsetrecipeInstance);
    }

    function loadRecipeInstance(result) {
      if (result.length === 1) {
        $scope.recipeInstance = result[0];
      } else {
        $scope.recipeInstance = null;
      }
    }

    function unsetrecipeInstance() {
      $scope.recipeInstance = null;
    }

    $.toasts('add', { msg: 'Welcome to Joulia!' });
  }
}());
