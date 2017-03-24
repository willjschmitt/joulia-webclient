angular
  .module('app.brewhouse')
  .controller('EndRecipeModalController', EndRecipeModalController);

EndRecipeModalController.$inject = ['$scope', '$uibModalInstance'];

function EndRecipeModalController($scope, $uibModalInstance) {
    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
}
