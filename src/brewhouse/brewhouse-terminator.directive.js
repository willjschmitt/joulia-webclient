(function loadBrewhouseTerminatorDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseTerminator', brewhouseTerminator);

  brewhouseTerminator.$inject = ['$http', '$uibModal'];

  function brewhouseTerminator($http, $uibModal) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipeInstance: '=',
      },
      templateUrl: 'static/brewhouse/brewhouse-terminator.tpl.html',
      link: function brewhouseTerminatorController($scope) {
        $scope.endSession = endSession;

        function endSession() {
          const modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'static/recipes/end-recipe-modal.tpl.html',
            controller: 'EndRecipeModalController',
          });

          modalInstance.result.then(endRecipeInstanceOnServer);

          return modalInstance;
        }

        function endRecipeInstanceOnServer() {
          $http({
            method: 'POST',
            url: '/brewery/brewhouse/end',
            data: {
              recipe_instance: $scope.recipeInstance,
            },
          }).then(unsetrecipeInstance);
        }

        function unsetrecipeInstance() {
          $scope.recipeInstance = null;
        }
      },
    };
  }
}());
