(function loadLaunchRecipeModalController() {
  angular
    .module('app.recipes')
    .controller('LaunchRecipeModalController', LaunchRecipeModalController);

  LaunchRecipeModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryResources'];

  function LaunchRecipeModalController(
      $scope, $uibModalInstance, breweryResources) {
    $scope.brewhouses = breweryResources.Brewhouse.query();
    $scope.selectedBrewhouse = null;

    $scope.ok = ok;
    $scope.cancel = cancel;

    function ok() {
      $uibModalInstance.close({ brewhouse: $scope.selectedBrewhouse });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
}());
