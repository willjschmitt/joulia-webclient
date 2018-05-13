(function loadConfirmDeleteController() {
  angular
    .module('app.common')
    .controller('ConfirmDeleteController', ConfirmDeleteController);

  ConfirmDeleteController.$inject = ['$scope', '$uibModalInstance', 'name'];

  function ConfirmDeleteController($scope, $uibModalInstance, name) {
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
}());
