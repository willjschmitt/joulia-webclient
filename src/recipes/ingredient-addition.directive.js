(function loadIngredientAddtionDirective() {
  angular
    .module('app.recipes')
    .directive('ingredientAddition', ingredientAddition);

  ingredientAddition.$inject = ['$interpolate', '$compile', 'breweryResources'];

  function ingredientAddition($interpolate, $compile, breweryResources) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        // The IngredientAddition to edit.
        ingredientAddition: '=addition',

        // The $resource that can be searched against with a 'search' generic
        // parameter and an 'id' parameter.
        ingredientResource: '=',

        // HTML to render for each ingredient in the search dropdown.
        ingredientHtml: '=',

        // The array of all additions. Used, so when an ingredientAddition is
        // removed, it is removed from the parent array.
        // TODO(willjschmitt): Reconsider passing the array, and rather
        // broadcast an event.
        ingredientAdditions: '=additions',
      },
      templateUrl: 'recipes/ingredient-addition.tpl.html',
      link: function ingredientAdditionsController($scope) {
        $scope.refreshIngredients = refreshIngredients;
        $scope.updateIngredientAddition = updateIngredientAddition;
        $scope.removeIngredientAddition = removeIngredientAddition;
        $scope.steps = breweryResources.BREWING_STEP_CHOICES_ordered;
        $scope.units = breweryResources.UNITS_CHOICES_ordered;

        $scope.userAmount = 0.0;
        $scope.unitsToGrams = 0.0;

        /**
         * Compiles the provided ingredientHtml into a function which can be
         * called with the ingredient to produce a formatted ingredient entry in
         * the search dropdown.
         */
        function compileIngredientHTML() {
          $scope.ingredientHTMLCompiled
              = $interpolate($scope.ingredientHtml || '');
        }
        $scope.$watch('ingredientHtml', compileIngredientHTML);

        /**
         * Refresh ingredients with a search query performed against the server.
         */
        function refreshIngredients(searchParameter) {
          const searchTerms = {};
          if ($scope.ingredientAddition.ingredient !== null
              && $scope.ingredientAddition.ingredient !== undefined) {
            searchTerms.id = $scope.ingredientAddition.ingredient;
          }
          if (searchParameter) {
            searchTerms.search = searchParameter;
          }
          if (angular.equals(searchTerms, {})) {
            return;
          }
          $scope.ingredients = $scope.ingredientResource.query(searchTerms);
        }

        $scope.$watch('ingredientAddition.ingredient',
          () => refreshIngredients());

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

        function calculateUnitsToGrams() {
          $scope.unitsToGrams
              = breweryResources.UNITS_CHOICES_conversion_factors[
                  $scope.ingredientAddition.units];
        }

        $scope.$watch('ingredientAddition.units', calculateUnitsToGrams);

        /**
         * A $watchGroup function to be executing when two mutually, but
         * linearly coupled values are updated, or their proportional
         * relationship to eachother. For an array of values, the relationship
         * is defined as:
         * values[1] = values[0] * values[2]
         * y = k * x
         */
        function updateMutuallyCoupledVariables(newValues, oldValues) {
          const newUserAmount = newValues[0];
          const oldUserAmount = oldValues[0];
          const newAmount = newValues[1];
          const oldAmount = oldValues[1];
          const newUnitsToGrams = newValues[2];
          const oldUnitsToGrams = oldValues[2];

          const changedAmount = newAmount !== oldAmount;
          const changedUserAmount = newUserAmount !== oldUserAmount;
          const changedUnitsToGrams = newUnitsToGrams !== oldUnitsToGrams;

          // This happens when the dependent variable is changed, and the change
          // from the first variable is still detected.
          if (changedAmount + changedUserAmount + changedUnitsToGrams > 1) {
            throw new Error(''.concat(
                'More than one watched variable changed, which should not',
                ` happen. changedUserAmount: ${changedUserAmount}; `,
                ` changedAmount: ${changedAmount}; changedUnitsToGrams: `,
                ` ${changedUnitsToGrams}.`));
          }

          let altAmount = newAmount;
          let altUserAmount = newUserAmount;
          if (changedUnitsToGrams) {
            // It's assumed changes to units should drive backend amounts rather
            // than changing the user displayed amount.
            altAmount = newUserAmount / newUnitsToGrams;
          } else if (changedUserAmount) {
            // If the user displayed value is changed (by the user), the backend
            // value also should be changed.
            altAmount = newUserAmount / newUnitsToGrams;
          } else if (changedAmount) {
            // If the backend amount changed (presumably by getting the
            // original value from the backend), the user displayed value should
            // be displayed.
            altUserAmount = newAmount * newUnitsToGrams;
          } else {
            // If nothing has changed, the initial values have been recieved,
            // and we should attempt the setting of the user-displayed value
            // right away.
            altUserAmount = newAmount * newUnitsToGrams;
          }

          // These checks now only change the variable not changed by the
          // $watchCollection. This avoids triggering infinite looping from
          // continuously changing the watched variables in an alternating
          // fashion. We use approximate float matching against smallError,
          // since these are calculated results.
          // TODO(willjschmitt): Try to figure out a way to generalize the
          // updating of the non-changed variable. This is impossible without
          // a generic way of getting a reference to the changed variables.
          const kSmallError = 1E-6;
          if (Math.abs(altAmount - newAmount) > kSmallError) {
            $scope.ingredientAddition.amount = altAmount;
            updateIngredientAddition();
          }
          if (Math.abs(altUserAmount - newUserAmount) > kSmallError) {
            $scope.userAmount = altUserAmount;
          }
        }

        /**
         * Updates weight value after a change with the user version into grams.
         */
        $scope.$watchCollection(
            '[userAmount, ingredientAddition.amount, unitsToGrams]',
            updateMutuallyCoupledVariables);
      },
    };
  }
}());
