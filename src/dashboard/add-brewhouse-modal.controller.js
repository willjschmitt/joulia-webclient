angular
  .module('app.dashboard')
  .controller('AddBrewhouseModalController', AddBrewhouseModalController);

AddBrewhouseModalController.$inject = [
    "$scope", "$uibModalInstance", "breweryApi", "brewery"];

function AddBrewhouseModalController(
    $scope, $uibModalInstance, breweryApi, brewery) {
  $scope.brewery = brewery;

  $scope.newBrewhouse = new breweryApi.brewhouse({brewery: brewery.id});

  $scope.ok = function () {
    $scope.newBrewhouse.$save(function() {
      $uibModalInstance.close(true);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
