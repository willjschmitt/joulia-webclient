import angular = require('angular');
import * as $ from 'jquery';

import 'circularProgress';

import '../../templates';
import '../../common/brewery-resources.factory';
import '../../common/searchable-select.directive';

function IngredientAdditionController($element, $interpolate, breweryResources) {
  const $scope = this;

  $scope.updateIngredientAddition = updateIngredientAddition;
  $scope.removeIngredientAddition = removeIngredientAddition;
  $scope.steps = breweryResources.BREWING_STEP_CHOICES_ordered;
  $scope.units = breweryResources.UNITS_CHOICES_ordered;

  $scope.userAmount = 0.0;
  $scope.unitsToGrams = 0.0;

  loadingElement().circularProgress();

  /**
   * Updates provided resource.
   */
  function updateIngredientAddition() {
    showLoadingElement();
    $scope.onUpdate({ ingredientAddition: $scope.ingredientAddition })
      .then(doneUpdating)
      .catch(hideLoadingElement);
  }

  /**
   * Handles a successful update of a ingredient addition. Hides the
   * loading icon. Updates the recipe so server-side calculations can be
   * retrieved.
   */
  function doneUpdating() {
    hideLoadingElement();
  }

  /**
   * Removes provided resource from server and local array.
   */
  function removeIngredientAddition() {
    showLoadingElement();
    $scope.onDelete({ ingredientAddition: $scope.ingredientAddition })
      .then(doneDeleting)
      .catch(hideLoadingElement);
  }

  /**
   * Handles a successful removal of a ingredient addition. Hides the
   * loading icon and removes the old ingredient to the
   * ingredientAdditions array.
   */
  function doneDeleting() {
    hideLoadingElement();
  }

  /**
   * Retrieves the loading element in this panel.
   */
  function loadingElement() {
    return $($element).find('#addition-loading');
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

  function calculateUnitsToGrams() {
    $scope.unitsToGrams
        = breweryResources.UNITS_CHOICES_conversion_factors[
            $scope.ingredientAddition.units];
    updateMutuallyCoupledVariables();
  }

  /**
   * A $watchGroup function to be executing when two mutually, but
   * linearly coupled values are updated, or their proportional
   * relationship to eachother. For an array of values, the relationship
   * is defined as:
   * values[1] = values[0] * values[2]
   * y = k * x
   */
  function updateMutuallyCoupledVariables() {
    const newUserAmount = $scope.userAmount;
    const oldUserAmount = $scope.oldUserAmount;
    const newAmount = $scope.ingredientAddition.amount;
    const oldAmount = $scope.oldIngredientAddition.amount;
    //const newUnitsToGrams = $scope.unitsToGrams;
    //const oldUnitsToGrams = $scope.oldUnitsToGrams;

    const changedAmount = newAmount !== oldAmount;
    const changedUserAmount = newUserAmount !== oldUserAmount;
    //const changedUnitsToGrams = newUnitsToGrams !== oldUnitsToGrams;

    // This happens when the dependent variable is changed, and the change
    // from the first variable is still detected.
    if (changedAmount + changedUserAmount > 1) {
      throw new Error(''.concat(
          'More than one watched variable changed, which should not',
          ` happen. changedUserAmount: ${changedUserAmount}; `,
          ` changedAmount: ${changedAmount}.`));
    }

    let altAmount = newAmount;
    let altUserAmount = newUserAmount;
    if (changedUserAmount) {
      // If the user displayed value is changed (by the user), the backend
      // value also should be changed.
      altAmount = newUserAmount / $scope.unitsToGrams;
    } else if (changedAmount) {
      // If the backend amount changed (presumably by getting the
      // original value from the backend), the user displayed value should
      // be displayed.
      altUserAmount = newAmount * $scope.unitsToGrams;
    } else {
      // If nothing has changed, the initial values have been recieved,
      // and we should attempt the setting of the user-displayed value
      // right away.
      altUserAmount = newAmount * $scope.unitsToGrams;
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

  this.$onInit = function() {
    console.log('initialize');
    $scope.oldIngredientAddition = angular.copy($scope.ingredientAddition);
    $scope.oldUserAmount = $scope.userAmount;
  }

  /**
   * Updates weight value after a change with the user version into grams.
   */
  this.$doCheck = function() {
    const amountChanged = ($scope.ingredientAddition.amount
                           !== $scope.oldIngredientAddition.amount);
    const userAmountChanged = ($scope.userAmount !== $scope.oldUserAmount);
    const unitsToGramsChanged = ($scope.unitsToGrams
                                 !== $scope.oldUnitsToGrams);
    console.log(amountChanged, userAmountChanged,
      $scope.ingredientAddition.amount, $scope.oldIngredientAddition.amount,
      $scope.userAmount, $scope.oldUserAmount);

    if (amountChanged || userAmountChanged || unitsToGramsChanged) {
      updateMutuallyCoupledVariables();
      $scope.oldIngredientAddition = angular.copy($scope.ingredientAddition);
      $scope.oldUserAmount = $scope.userAmount;
      return;
    }

    const unitsChanged = ($scope.ingredientAddition.units
                          !== $scope.oldIngredientAddition.units);
    console.log(unitsChanged, $scope.ingredientAddition.units,
      $scope.oldIngredientAddition.units);
    if (unitsChanged) {
      calculateUnitsToGrams();
      $scope.oldIngredientAddition = angular.copy($scope.ingredientAddition);
      return;
    }
  //$scope.$watch('ingredientAddition.units', calculateUnitsToGrams);

    // $scope.$watchCollection(
  //     '[userAmount, ingredientAddition.amount, unitsToGrams]',
  //     updateMutuallyCoupledVariables);

  }

};

angular
  .module('app.recipes.ingredient.addition',
    [
      'app.templates',
      'app.common.brewery-resources',
      'app.common.searchable-select',
    ])
  .component('ingredientAddition', {
    templateUrl: 'recipes/ingredient/ingredient-addition.tpl.html',
    bindings: {
      // The IngredientAddition to edit.
      ingredientAddition: '<addition',

      // The $resource that can be searched against with a 'search' generic
      // parameter and an 'id' parameter.
      ingredientResource: '<',

      // HTML to render for each ingredient in the search dropdown.
      ingredientHtml: '<',

      // Callback to handle deletion of ingredient addition. This component will
      // perform the delete call to the server. Should return a promise.
      onDelete: '&',

      // Callback to handle updates of ingredient addition. This component will
      // perform the update call to the server. Should return a promise.
      onUpdate: '&',
    },
    controller: [
      '$element',
      '$interpolate',
      'breweryResources',
      IngredientAdditionController,
    ],
  });
