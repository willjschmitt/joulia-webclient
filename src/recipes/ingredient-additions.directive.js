(function loadIngredientAddtionsDirective() {
  angular
    .module('app.recipes')
    .directive('ingredientAdditions', ingredientAdditions);

  ingredientAdditions.$inject = ['breweryResources'];

  function ingredientAdditions(breweryResources) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        ingredientAdditions: '=',
        recipe: '=',
        ingredientResource: '=',
        ingredientHtml: '=',
        Resource: '=resource',
        defaultStep: '=',
      },
      templateUrl: 'recipes/ingredient-additions.tpl.html',
      link: function ingredientAdditionsController($scope) {
        $scope.addIngredientAddition = addIngredientAddition;
        $scope.updateIngredientAddition = updateIngredientAddition;
        $scope.removeIngredientAddition = removeIngredientAddition;
        $scope.steps = breweryResources.BREWING_STEP_CHOICES_ordered;
        $scope.units = breweryResources.UNITS_CHOICES_ordered;

        /**
         * Saves and adds new ingredientAddition to recipe.
         */
        function addIngredientAddition() {
          const newIngredientAddition = new $scope.Resource({
            recipe: $scope.recipe.id,
            step_added: $scope.defaultStep.value,
          });
          newIngredientAddition.$save(
              ingredientAddition => $scope.ingredientAdditions.push(
                  ingredientAddition));
        }

        /**
         * Updates provided resource.
         */
        function updateIngredientAddition(ingredientAddition) {
          ingredientAddition.$update();
        }

        /**
         * Removes provided resource from server and local array.
         */
        function removeIngredientAddition(ingredientAddition) {
          const index = $scope.ingredientAdditions.indexOf(ingredientAddition);
          ingredientAddition.$delete(
              () => $scope.ingredientAdditions.splice(index, 1));
        }
      },
    };
  }
}());
