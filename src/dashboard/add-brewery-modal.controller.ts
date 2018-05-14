AddBreweryModalController.$inject = [
  '$scope', '$uibModalInstance', 'breweryResources'];

export function AddBreweryModalController(
    $scope, $uibModalInstance, breweryResources) {
  $scope.newBrewery = new breweryResources.Brewery();
  $scope.brewingCompanys = breweryResources.BrewingCompany.query();
  $scope.ok = ok;
  $scope.cancel = cancel;

  function ok() {
    $scope.newBrewery.$save(close);
  }

  function close() {
    $uibModalInstance.close($scope.newBrewery);
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
