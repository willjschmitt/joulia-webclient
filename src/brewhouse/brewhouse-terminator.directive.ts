brewhouseTerminator.$inject = ['$http', '$uibModal', 'recipeInstances'];

export function brewhouseTerminator($http, $uibModal, recipeInstances) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      recipeInstance: '=',
    },
    templateUrl: 'brewhouse/brewhouse-terminator.tpl.html',
    link: function brewhouseTerminatorController($scope) {
      $scope.endSession = endSession;

      function endSession() {
        const modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'recipes/end-recipe-modal.tpl.html',
          controller: 'EndRecipeModalController',
        });

        modalInstance.result.then(endRecipeInstanceOnServer);

        return modalInstance;
      }

      function endRecipeInstanceOnServer() {
        recipeInstances.end($scope.recipeInstance).then(unsetrecipeInstance);
      }

      function unsetrecipeInstance() {
        $scope.recipeInstance = null;
      }
    },
  };
}
