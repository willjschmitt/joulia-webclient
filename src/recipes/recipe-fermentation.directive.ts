import angular = require('angular');
import * as $ from 'jquery';

import 'circularProgress';

import '../templates';
import '../common/brewery-resources.factory';
import '../common/searchable-select.directive';

angular
  .module('app.recipes.recipe-fermentation',
    [
      'app.templates',
      'app.common.brewery-resources',
      'app.common.searchable-select',
    ])
  .directive('recipeFermentation', recipeFermentation);

recipeFermentation.$inject = ['breweryResources'];

function recipeFermentation(breweryResources) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      // The recipe the ingredient addition is attached to, so it can be
      // updated when ingredient additions are updated.
      recipe: '=recipe',
    },
    templateUrl: 'recipes/recipe-fermentation.tpl.html',
    link: function recipeFermentationController($scope, $element) {
      $scope.yeastResource = breweryResources.YeastIngredientSearch;
      $scope.updateRecipe = updateRecipe;
      $scope.yeastIngredientHTML = `
        <div>{{ name }}</div>
        <div>
          <small>
            Attenuation: {{ low_attenuation * 100 | number : 0 }}-{{ high_attenuation * 100 | number : 0 }}%
            <br/>
            ABV Tolerance: {{ low_abv_tolerance * 100 | number : 1 }}-{{ high_abv_tolerance * 100 | number : 0 }}%
            <br/>
            Temperature: {{ low_temperature }}-{{ high_temperature }}&deg;F
          </small>
        </div>`;

      loadingElement().circularProgress();

      /**
       * Updates provided recipe.
       */
      function updateRecipe() {
        showLoadingElement();
        $scope.recipe.$update(hideLoadingElement, hideLoadingElement);
      }

      /**
       * Retrieves the loading element in this panel.
       */
      function loadingElement() {
        return $($element).find('#yeast-loading');
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
