import angular = require('angular');

import '../templates';

angular
  .module('app.recipes.recipe-property', ['app.templates',])
  .directive('recipeProperty', recipeProperty);

recipeProperty.$inject = [];

function recipeProperty() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      // Min and max values for the appropriate range for this property.
      // Will be shown as a range on the property bar. This is usually
      // specific to a style.
      minAppropriate: '=',
      maxAppropriate: '=',

      // Min and max reasonable values for the property. Will be used for the
      // ends of the bar (not the solid range in the middle).
      minAbsolute: '=',
      maxAbsolute: '=',

      // The current value of the property to be shown as a small indicator on
      // the bar relative to the appropriate range.
      value: '=',
    },
    templateUrl: 'recipes/recipe-property.tpl.html',
    link: function recipeFermentationController($scope) {
      $scope.$watchCollection(
          '[minAppropriate, maxAppropriate, minAbsolute, maxAbsolute]',
          updateBar);
      function updateBar() {
        const left = (
            100.0 * (
                ($scope.minAppropriate - $scope.minAbsolute)
                / ($scope.maxAbsolute - $scope.minAbsolute)
            )
        );
        const right = (
            100.0 * (
                ($scope.maxAbsolute - $scope.maxAppropriate)
                / ($scope.maxAbsolute - $scope.minAbsolute)
            )
        );
        $scope.barStyles = {
          left: `${left}%`,
          right: `${right}%`,
        };
      }

      $scope.$watchCollection(
          '[value, minAbsolute, maxAbsolute]', updateIndicator);
      function updateIndicator() {
        const left = (
            100.0 * (
                ($scope.value - $scope.minAbsolute)
                / ($scope.maxAbsolute - $scope.minAbsolute)
            )
        );
        $scope.indicatorStyles = { left: `${left}%` };
      }
    },
  };
}
