(function loadAddRecipeModalController() {
  angular
    .module('app.recipes')
    .controller('AddRecipeModalController', AddRecipeModalController);

  AddRecipeModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryResources'];

  function AddRecipeModalController(
      $scope, $uibModalInstance, breweryResources) {
    $scope.newRecipe = new breweryResources.Recipe();
    $scope.beerStyles = breweryResources.BeerStyle.query();
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
}());
