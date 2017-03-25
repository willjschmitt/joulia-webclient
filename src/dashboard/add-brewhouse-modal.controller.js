(function loadAddBrewhouseModalController() {
  angular
    .module('app.dashboard')
    .controller('AddBrewhouseModalController', AddBrewhouseModalController);

  AddBrewhouseModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryApi', 'brewery'];

  function AddBrewhouseModalController(
      $scope, $uibModalInstance, breweryApi, brewery) {
    $scope.brewery = brewery;
    $scope.newBrewhouse = new breweryApi.Brewhouse({ brewery: brewery.id });
    $scope.ok = ok;
    $scope.cancel = cancel;

    function ok() {
      $scope.newBrewhouse.$save(close);
    }

    function close() {
      $uibModalInstance.close(true);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
}());
