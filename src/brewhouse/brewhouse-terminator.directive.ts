import angular = require('angular');

import 'angular-ui-bootstrap';

import '../templates';
import '../recipes/instance/recipe-instances.service';
import '../recipes/instance/end-recipe-modal.component';

angular
  .module('app.brewhouse.terminator',
    [
      'app.templates',
      'ui.bootstrap',
      'app.recipes.instance.recipe-instances',
      'app.recipes.instance.end-recipe-modal',
    ])
  .directive('brewhouseTerminator', brewhouseTerminator);

brewhouseTerminator.$inject = ['$http', '$uibModal', 'recipeInstances'];

function brewhouseTerminator($http, $uibModal, recipeInstances) {
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
          component: 'endRecipeModal',
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
