(function loadAddRecipeModalController() {
  angular
    .module('app.recipes')
    .controller('EditRecipeModalController', EditRecipeModalController);

  EditRecipeModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryResources', 'recipe', 'mashPoints'];

  function EditRecipeModalController(
      $scope, $uibModalInstance, breweryResources, recipe, mashPoints) {
    $scope.recipe = recipe;
    $scope.mashPoints = mashPoints;
    if (!$scope.recipe) {
      $scope.recipe = new breweryResources.Recipe();
    }
    $scope.beerStyles = breweryResources.BeerStyle.query();
    $scope.ok = ok;
    $scope.cancel = cancel;
    $scope.addMashPoint = addMashPoint;
    $scope.updateMashPoint = updateMashPoint;

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

    /**
     * Saves and adds new mashPoint to recipe.
     */
    function addMashPoint() {
      const newMashPoint = new breweryResources.MashPoint(
          { recipe: $scope.recipe.id });
      newMashPoint.$save(mashPoint => $scope.mashPoints.push(mashPoint));
    }

    /**
     * Updates provided MashPoint resource.
     */
    function updateMashPoint(mashPoint) {
      mashPoint.$update();
    }
  }
}());
