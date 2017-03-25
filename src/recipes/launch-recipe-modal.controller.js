angular
  .module('app.recipes')
  .controller('LaunchRecipeModalController', LaunchRecipeModalController);

LaunchRecipeModalController.$inject = [
  '$scope', '$uibModalInstance', 'breweryApi'];

function LaunchRecipeModalController($scope, $uibModalInstance, breweryApi) {
  $scope.brewhouses = breweryApi.brewhouse.query();
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
