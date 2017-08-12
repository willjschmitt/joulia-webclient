(function loadAddRecipeModalController() {
  angular
    .module('app.recipes')
    .controller('EditRecipeModalController', EditRecipeModalController);

  EditRecipeModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryResources', 'recipe', 'mashPoints',
    'brewingCompany'];

  function EditRecipeModalController(
      $scope, $uibModalInstance, breweryResources, recipe, mashPoints,
      brewingCompany) {
    $scope.recipe = recipe;
    if (!$scope.recipe) {
      $scope.recipe = new breweryResources.Recipe({ company: brewingCompany });
    }
    $scope.mashPoints = mashPoints;
    $scope.beerStyles = breweryResources.BeerStyle.query();
    $scope.ok = ok;
    $scope.cancel = cancel;

    /**
     * Handles successful "OK" button press for submitting user input.
     */
    function ok() {
      if ($scope.recipe.hasOwnProperty('id')) {
        $scope.recipe.$update(close);
      } else {
        $scope.recipe.$save(close);
      }
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
