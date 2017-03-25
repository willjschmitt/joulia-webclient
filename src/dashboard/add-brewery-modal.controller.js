(function loadAddBreweryModalController() {
  angular
    .module('app.dashboard')
    .controller('AddBreweryModalController', AddBreweryModalController);

  AddBreweryModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryApi'];

  function AddBreweryModalController($scope, $uibModalInstance, breweryApi) {
    $scope.newBrewery = new breweryApi.Brewery();
    $scope.brewingCompanys = new breweryApi.BrewingCompany().query();
    $scope.ok = ok;
    $scope.cancel = cancel;

    function ok() {
      $scope.newBrewery.$save(close);
    }

    function close() {
      $uibModalInstance.close(true);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
}());
