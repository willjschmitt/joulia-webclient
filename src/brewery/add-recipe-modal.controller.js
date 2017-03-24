angular
  .module('app.recipes')
  .controller('AddRecipeModalController', AddRecipeModalController);

AddRecipeModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryApi'];

function AddRecipeModalController($scope, $uibModalInstance, breweryApi) {
  $scope.newRecipe = new breweryApi.recipe();

  $scope.beerStyles = breweryApi.beerStyle.query();

  $scope.ok = function () {
    $scope.newRecipe.$save(function() {
      $uibModalInstance.close(true);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
