ConfirmDeleteController.$inject = ['$scope', '$uibModalInstance', 'name'];

export function ConfirmDeleteController($scope, $uibModalInstance, name) {
  $scope.ok = ok;
  $scope.cancel = cancel;
  $scope.name = name;

  function ok() {
    $uibModalInstance.close();
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
