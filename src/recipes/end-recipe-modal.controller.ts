EndRecipeModalController.$inject = ['$scope', '$uibModalInstance'];

export function EndRecipeModalController($scope, $uibModalInstance) {
  $scope.ok = ok;
  $scope.cancel = cancel;

  function ok() {
    $uibModalInstance.close(true);
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
