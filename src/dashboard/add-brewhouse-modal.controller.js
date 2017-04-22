(function loadAddBrewhouseModalController() {
  angular
    .module('app.dashboard')
    .controller('AddBrewhouseModalController', AddBrewhouseModalController);

  AddBrewhouseModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryResources', 'brewery'];

  function AddBrewhouseModalController(
      $scope, $uibModalInstance, breweryResources, brewery) {
    $scope.brewery = brewery;
    $scope.newBrewhouse = new breweryResources.Brewhouse({ brewery: brewery.id });
    $scope.ok = ok;
    $scope.cancel = cancel;

    function ok() {
      $scope.newBrewhouse.$save(close);
    }

    function close() {
      $uibModalInstance.close($scope.newBrewhouse);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
}());
