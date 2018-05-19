SelectBrewingCompanyController.$inject = [
  '$scope', '$uibModalInstance', 'breweryResources'];

export function SelectBrewingCompanyController(
    $scope, $uibModalInstance, breweryResources) {
  $scope.brewingCompanys = breweryResources.BrewingCompany.query();
  $scope.ok = ok;
  $scope.cancel = cancel;

  $scope.selectedCompany = null;

  function ok() {
    close();
  }

  function close() {
    $uibModalInstance.close($scope.selectedCompany);
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
