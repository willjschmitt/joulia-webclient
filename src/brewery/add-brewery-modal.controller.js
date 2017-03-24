angular
  .module('app.dashboard')
  .controller('AddBreweryModalController', AddBreweryModalController);

AddBreweryModalController.$inject = [
    "$scope", "$uibModalInstance", "breweryApi"];

function AddBreweryModalController($scope, $uibModalInstance, breweryApi) {
  $scope.newBrewery = new breweryApi.brewery();

  $scope.brewingCompanys = new breweryApi.brewingCompany.query();

  $scope.ok = function () {
    $scope.newBrewery.$save(function() {
      $uibModalInstance.close(true);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
