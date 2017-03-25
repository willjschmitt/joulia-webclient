angular
  .module('app.recipes')
  .controller('AddRecipeModalController', AddRecipeModalController);

AddRecipeModalController.$inject = [
  '$scope', '$uibModalInstance', 'breweryApi'];

function AddRecipeModalController($scope, $uibModalInstance, breweryApi) {
  $scope.newRecipe = new breweryApi.Recipe();
  $scope.beerStyles = breweryApi.beerStyle.query();
  $scope.ok = ok;
  $scope.cancel = cancel;

  function ok() {
    $scope.newRecipe.$save(close);
  }

  function close() {
    $uibModalInstance.close(true);
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
