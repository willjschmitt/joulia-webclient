angular
  .module('app.recipes')
  .controller('LaunchRecipeModalController', LaunchRecipeModalController);

LaunchRecipeModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryApi'];

function ($scope, $uibModalInstance, breweryApi) {
  $scope.brewhouses = breweryApi.brewhouse.query();
  $scope.selectedBrewhouse = null;

  $scope.ok = function () {
    $uibModalInstance.close({brewhouse: $scope.selectedBrewhouse});
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
