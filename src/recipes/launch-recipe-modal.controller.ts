LaunchRecipeModalController.$inject = [
  '$scope', '$uibModalInstance', 'breweryResources'];

export function LaunchRecipeModalController(
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