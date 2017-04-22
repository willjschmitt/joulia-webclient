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

    /**
     * Handles successful "OK" button press for submitting user input.
     */
    function ok() {
      $scope.newRecipe.$save(close);
    }

    /**
     * Closes modal, resolving as successful.
     */
    function close() {
      $uibModalInstance.close(true);
    }

    /**
     * Closes modal, resolving as failure.
     */
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
}());
