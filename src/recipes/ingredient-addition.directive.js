(function loadIngredientAddtionDirective() {
  angular
    .module('app.recipes')
    .directive('ingredientAddition', ingredientAddition);

  ingredientAddition.$inject = ['breweryResources'];

  function ingredientAddition(breweryResources) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        // The IngredientAddition to edit.
        ingredientAddition: '=',

        // The ingredients to select from for the addition.
        ingredients: '=',

        // The array of all additions. Used, so when an ingredientAddition is
        // removed, it is removed from the parent array.
        // TODO(willjschmitt): Reconsider passing the array, and rather
        // broadcast an event.
        ingredientAdditions: '=',
      },
      templateUrl: 'recipes/ingredient-additions.tpl.html',
      link: function ingredientAdditionsController($scope) {
        $scope.updateIngredientAddition = updateIngredientAddition;
        $scope.removeIngredientAddition = removeIngredientAddition;
        $scope.steps = breweryResources.BREWING_STEP_CHOICES_ordered;
        $scope.units = breweryResources.UNITS_CHOICES_ordered;

        $scope.amountUserUnits = 0.0;

        /**
         * Updates provided resource.
         */
        function updateIngredientAddition() {
          $scope.ingredientAddition.$update();
        }

        /**
         * Removes provided resource from server and local array.
         */
        function removeIngredientAddition() {
          const index = $scope.ingredientAdditions.indexOf(
              $scope.ingredientAddition);
          $scope.ingredientAddition.$delete(
              () => $scope.ingredientAdditions.splice(index, 1));
        }

        /* function unitsToGramsConversionFactor() {
          $scope.amountUserUnitsToIngredientAdditionAmount
              = breweryResources.UNITS_CHOICES_conversion_factors[
                  $scope.ingredientAddition.units];
        }*/

        // $scope.$watch('ingredientAddition.units', unitsToGramsConversionFactor);

        /**
         * A $watchGroup function to be executing when two mutually, but
         * linearly coupled values are updated, or their proportional
         * relationship to eachother. For an array of values, the relationship
         * is defined as:
         * values[1] = values[0] * values[2]
         * y = k * x
         */
        function updateMutuallyCoupledVariables(newValues, oldValues, scope) {
          /* const newAmountUserUnits = newValues[0];
          const newIngredientAdditionAmount = newValues[1];
          const oldAmountUserUnits = oldValues[0];
          const oldIngredientAdditionAmount = oldValues[1];

          const amountUserUnitsToIngredientAdditionAmount = newValues[2];

          let altAmountUserUnits = newAmountUserUnits;
          let altIngredientAdditionAmount = newIngredientAdditionAmount;
          if (newAmountUserUnits !== oldAmountUserUnits) {
            altIngredientAdditionAmount
                = newAmountUserUnits
                    / amountUserUnitsToIngredientAdditionAmount;
          }
          if (newIngredientAdditionAmount !== oldIngredientAdditionAmount) {
            altAmountUserUnits
                = newIngredientAdditionAmount
                    * amountUserUnitsToIngredientAdditionAmount;
          }

          if (altIngredientAdditionAmount !== newIngredientAdditionAmount) {
            console.log('a');
          }
          if (altAmountUserUnits !== newAmountUserUnits) {
            console.log('b');
          }*/
          console.log(scope);
        }

        /**
         * Updates weight value after a change with the user version into grams.
         */
        $scope.$watchGroup(
          [
            'amountUserUnits', 'ingredientAddition.amount',
            'amountUserUnitsToIngredientAdditionAmount',
          ], updateMutuallyCoupledVariables);
      },
    };
  }
}());
