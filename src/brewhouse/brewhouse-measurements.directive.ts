brewhouseMeasurements.$inject = [];

export function brewhouseMeasurements() {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      recipeInstance: '=',
    },
    templateUrl: 'brewhouse/brewhouse-measurements.tpl.html',
    link: function brewhouseMeasurementsController($scope) {
      $scope.measurementChange = measurementChange;

      /**
       * Saves the recipe instance. Should be called when measurement values
       * are changed.
       */
      function measurementChange() {
        $scope.recipeInstance.$update();
      }
    },
  };
}
