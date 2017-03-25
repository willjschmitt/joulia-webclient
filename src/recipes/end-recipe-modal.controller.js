angular
  .module('app.brewhouse')
  .controller('EndRecipeModalController', EndRecipeModalController);

EndRecipeModalController.$inject = ['$scope', '$uibModalInstance'];

function EndRecipeModalController($scope, $uibModalInstance) {
  $scope.ok = ok;
  $scope.cancel = cancel;

  function ok() {
    $uibModalInstance.close(true);
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
