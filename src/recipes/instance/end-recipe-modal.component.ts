import angular = require('angular');

import 'angular-ui-bootstrap';

import '../../templates';

function EndRecipeModalController() {
  const $scope = this;
  $scope.ok = function ok() {
    $scope.close({ $value: true });
  };

  $scope.cancel = function cancel() {
    $scope.dismiss({ $value: 'cancel' });
  };
}

angular
  .module('app.recipes.instance.end-recipe-modal', ['app.templates',])
  .component('endRecipeModal', {
    templateUrl: 'recipes/instance/end-recipe-modal.tpl.html',
    bindings: {
      close: '&',
      dismiss: '&',
    },
    controller: [EndRecipeModalController],
  });
