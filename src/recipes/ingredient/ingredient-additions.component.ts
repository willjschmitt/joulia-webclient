import angular = require('angular');
import * as $ from 'jquery';

import 'circularProgress';

import '../../templates';
import '../../common/brewery-resources.factory';
import './ingredient-addition.component';

angular
  .module('app.recipes.ingredient.additions',
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
      title: '<',

      recipeId: '<',
      ingredientResource: '<',
      ingredientHtml: '<',
      Resource: '<resource',
      defaultStep: '<',

      // Callback to be called when a change is made to ingredient additions.
      // Includes adding, removing, or saving an addition. Should return a
      // Promise.
      onChange: '&',
    },
    templateUrl: 'recipes/ingredient/ingredient-additions.tpl.html',
    link: function ingredientAdditionsController($scope, $element) {
      $scope.ingredientAdditions = $scope.Resource.query(
          { recipe: $scope.recipeId });
      $scope.steps = breweryResources.BREWING_STEP_CHOICES_ordered;
      $scope.units = breweryResources.UNITS_CHOICES_ordered;

      /**
       * Saves and adds new ingredientAddition to recipe.
       */
      $scope.addIngredientAddition = function addIngredientAddition() {
        const newIngredientAddition = new $scope.Resource({
          recipe: $scope.recipeId,
          step_added: $scope.defaultStep.value,
        });
        showLoadingElement();
        return newIngredientAddition.$save(
          ingredientAddition => {
            hideLoadingElement();
            $scope.ingredientAdditions.push(ingredientAddition);
            $scope.onChange();
          },
          () => {
            hideLoadingElement();
          }
        );
      }

      /**
       * Deletes ingredient addition and removes it from ingredientAdditions.
       */
      $scope.deleteIngredientAddition = function deleteIngredientAddition(
          ingredientAddition) {
        const index = $scope.ingredientAdditions.indexOf(ingredientAddition);
        return ingredientAddition.$delete(
          () => {
            $scope.ingredientAdditions.splice(index, 1);
            $scope.onChange();
          });
      }

      /**
       * Updates ingredient addition.
       */
      function updateIngredientAddition(ingredientAddition) {
        const index = $scope.ingredientAdditions.indexOf(ingredientAddition);
        return ingredientAddition.$update(
          () => {
            $scope.onChange();
          });
      }

      /**
       * Updates ingredient on an ingredient addition.
       */
      $scope.updateIngredient = function updateIngredient(
          ingredientAddition, value) {
        ingredientAddition.ingredient = value;
        return updateIngredientAddition(ingredientAddition);
      }

      /**
       * Updates amount on an ingredient addition.
       */
      $scope.updateAmount = function updateUnits(
          ingredientAddition, value) {
        ingredientAddition.amount = value;
        return updateIngredientAddition(ingredientAddition);
      }

      /**
       * Updates units on an ingredient addition.
       */
      $scope.updateUnits = function updateUnits(
          ingredientAddition, value) {
        ingredientAddition.units = value;
        return updateIngredientAddition(ingredientAddition);
      }

      /**
       * Updates step_added on an ingredient addition.
       */
      $scope.updateStepAdded = function updateStepAdded(
          ingredientAddition, value) {
        ingredientAddition.step_added = value;
        return updateIngredientAddition(ingredientAddition);
      }

      /**
       * Updates time_added on an ingredient addition.
       */
      $scope.updateTimeAdded = function updateTimeAded(
          ingredientAddition, value) {
        ingredientAddition.time_added = value;
        return updateIngredientAddition(ingredientAddition);
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
