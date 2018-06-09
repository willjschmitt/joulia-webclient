import angular = require('angular');
import * as $ from 'jquery';

import 'circularProgress';

import '../../templates';
import '../../common/brewery-resources.factory';
import '../../common/searchable-select.directive';

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
      // The ingredient used in this addition.
      ingredient: '<',
      // Absolute amount of ingredient used in this addition. In standard units.
      amount: '<',
      // The units the user perfers to view this addition in. Modifies amount to
      // present to user.
      units: '<',
      // The enum step this addition is added in at.
      stepAdded: '<',
      // The time the ingredient will be in contact with the wort.
      timeAdded: '<',

      // Callback to handle updates of ingredient. Should return a promise.
      onUpdateIngredient: '&',
      // Callback to handle updates of amount. Should return a promise.
      onUpdateAmount: '&',
      // Callback to handle updates of units. Should return a promise.
      onUpdateUnits: '&',
      // Callback to handle updates of stepAdded. Should return a promise.
      onUpdateStepAdded: '&',
      // Callback to handle updates of timeAdded. Should return a promise.
      onUpdateTimeAdded: '&',

      // Callback to handle deletion of ingredient addition. This component will
      // perform the delete call to the server. Should return a promise.
      onDelete: '&',

      // The $resource that can be searched against with a 'search' generic
      // parameter and an 'id' parameter.
      ingredientResource: '<',

      // HTML to render for each ingredient in the search dropdown.
      ingredientHtml: '<',
    },
    controller: [
      '$element',
      '$interpolate',
      'breweryResources',
      IngredientAdditionController,
    ],
  });

function IngredientAdditionController($element, $interpolate, breweryResources) {
  const $scope = this;

  $scope.$onChanges = function(changesObj) {
    console.log(changesObj);
    if (changesObj.ingredient) {
      $scope.ingredientObj = { id: changesObj.ingredient.currentValue };
    }

    if (changesObj.amount || changesObj.units) {
      recalculateUserAmount();
    }
  }

  $scope.$onInit = function() {
    $scope.steps = breweryResources.BREWING_STEP_CHOICES_ordered;
    $scope.unitsOptions = breweryResources.UNITS_CHOICES_ordered;

    loadingElement().circularProgress();
  };

  /**
   * Handles a successful update of a ingredient addition. Hides the
   * loading icon. Updates the recipe so server-side calculations can be
   * retrieved.
   */
  function doneUpdating() {
    hideLoadingElement();
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

  /**
   * Recalculates the server-stored amount of an ingredient addition from the
   * user-provided amount and units.
   */
  function recalculateAmount() {
    const unitsToGrams
        = breweryResources.UNITS_CHOICES_conversion_factors[$scope.units];
    $scope.amount = $scope.userAmount / unitsToGrams;
  }

  /**
   * Recalculates the amount to display to the user after a change to raw amount
   * or units are changed.
   */
  function recalculateUserAmount() {
    const unitsToGrams
        = breweryResources.UNITS_CHOICES_conversion_factors[$scope.units];
    $scope.userAmount = $scope.amount * unitsToGrams;
  }

  /**
   * Calls onUpdateIngredient callback, showing and hiding a loading element.
   */
  $scope.updateIngredient = function (newIngredient) {
    $scope.ingredient = newIngredient;
    showLoadingElement();
    $scope.onUpdateIngredient({ value: $scope.ingredient })
      .then(doneUpdating)
      .catch(hideLoadingElement);
  };

  /**
   * Calls onUpdateUnits callback, showing and hiding a loading element.
   */
  $scope.updateUnits = function (newUnits) {
    $scope.units = newUnits;
    recalculateUserAmount();
    showLoadingElement();
    $scope.onUpdateUnits({ value: $scope.units })
      .then(doneUpdating)
      .catch(hideLoadingElement);
  };

  /**
   * Calls onUpdateUserAmount callback, showing and hiding a loading element.
   */
  $scope.updateUserAmount = function (newUserAmount) {
    $scope.userAmount = newUserAmount;
    recalculateAmount();
    showLoadingElement();
    $scope.onUpdateAmount({ value: $scope.amount })
      .then(doneUpdating)
      .catch(hideLoadingElement);
  }

  /**
   * Calls onUpdateTimeAdded callback, showing and hiding a loading element.
   */
  $scope.updateTimeAdded = function (newTimeAdded) {
    $scope.timeAdded = newTimeAdded;
    showLoadingElement();
    $scope.onUpdateTimeAdded({ value: $scope.timeAdded })
      .then(doneUpdating)
      .catch(hideLoadingElement);
  };

  /**
   * Calls onUpdateStepAdded callback, showing and hiding a loading element.
   */
  $scope.updateStepAdded = function (newStepAdded) {
    $scope.stepAdded = newStepAdded;
    showLoadingElement();
    $scope.onUpdateStepAdded({ value: $scope.ingredientAddition })
      .then(doneUpdating)
      .catch(hideLoadingElement);
  };

  /**
   * Calls onDelete callback, showing and hiding a loading element.
   */
  $scope.removeIngredientAddition = function () {
    showLoadingElement();
    $scope.onDelete({ ingredientAddition: $scope.ingredientAddition })
      .then(doneDeleting)
      .catch(hideLoadingElement);
  }
};
