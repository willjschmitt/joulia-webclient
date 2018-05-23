import angular = require('angular');
import * as $ from 'jquery';

import 'circularProgress';

import '../templates';
import '../common/brewery-resources.factory';
import './ingredient/ingredient-addition.component';

angular
  .module('app.recipes.ingredient-additions',
    [
      'app.templates',
      'app.common.brewery-resources',
      'app.recipes.ingredient.addition',
    ])
  .directive('ingredientAdditions', ingredientAdditions);

ingredientAdditions.$inject = ['breweryResources'];

function ingredientAdditions(breweryResources) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      // Human readable title used for the header for the panel.
      title: '=',

      ingredientAdditions: '=',
      recipe: '=',
      ingredientResource: '=',
      ingredientHtml: '=',
      Resource: '=resource',
      defaultStep: '=',
    },
    templateUrl: 'recipes/ingredient-additions.tpl.html',
    link: function ingredientAdditionsController($scope, $element) {
      $scope.addIngredientAddition = addIngredientAddition;
      $scope.deleteIngredientAddition = deleteIngredientAddition;
      $scope.updateIngredientAddition = updateIngredientAddition;
      $scope.steps = breweryResources.BREWING_STEP_CHOICES_ordered;
      $scope.units = breweryResources.UNITS_CHOICES_ordered;

      /**
       * Saves and adds new ingredientAddition to recipe.
       */
      function addIngredientAddition() {
        console.log($scope.Resource);
        const newIngredientAddition = new $scope.Resource({
          recipe: $scope.recipe.id,
          step_added: $scope.defaultStep.value,
        });
        showLoadingElement();
        newIngredientAddition.$save(
            ingredientAddition => doneAdding(ingredientAddition),
            hideLoadingElement);
      }

      /**
       * Handles a successful addition of a new ingredient addition. Hides
       * the loading icon and adds the new ingredient to the
       * ingredientAdditions array.
       */
      function doneAdding(ingredientAddition) {
        hideLoadingElement();
        $scope.ingredientAdditions.push(ingredientAddition);
        $scope.recipe.$update();
      }

      /**
       * Deletes ingredient addition and removes it from ingredientAdditions.
       */
      function deleteIngredientAddition(ingredientAddition) {
        const index = $scope.ingredientAdditions.indexOf(ingredientAddition);
        return ingredientAddition.$delete(() => {
            $scope.ingredientAdditions.splice(index, 1);
            $scope.recipe.$update();
          })
          .$promise;
      }

      /**
       * Updates ingredient addition.
       */
      function updateIngredientAddition(ingredientAddition) {
        const index = $scope.ingredientAdditions.indexOf(ingredientAddition);
        return ingredientAddition.$update(() => {
            $scope.recipe.$update();
          })
          .$promise;
      }

      /**
       * Retrieves the loading element in this panel.
       */
      function loadingElement() {
        return $($element).find('#additions-loading');
      }

      /**
       * Shows the loading icon. That is, starts the icon spinning.
       */
      function showLoadingElement() {
        loadingElement().circularProgress('show');
      }

      /**
       * Hides the loading icon. That is, stops the icon spinning.
       */
      function hideLoadingElement() {
        loadingElement().circularProgress('hide');
      }
    },
  };
}
