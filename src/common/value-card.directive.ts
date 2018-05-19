valueCard.$inject = ['TimeSeriesUpdater'];

export function valueCard(TimeSeriesUpdater) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: '=',
      valueName: '=',
      valueAlternateName: '=?',
      valueAlternateFunction: '=?',
      units: '=',
      unitsAlternate: '=?',
      overridable: '=?',
      overridableAlternate: '=?',
      recipeInstance: '=',

      // The number of seconds to filter on (negative indicating the past) for
      // requesting historical data.
      historyTime: '=',
    },
    templateUrl: 'common/value-card.tpl.html',
    link: function valueCardController($scope) {
      // Give us all the little line things for the little cards.
      $('.peity-line').peity('line', { height: 28, width: 64 });

      if ($scope.overridable && $scope.overridableAlternate) {
        throw new Error(
          'overridable and overridableAlternate cannot both be set to true.');
      }

      // Default to the units for the alternate value if alternate units are
      // not provided.
      if (!$scope.unitsAlternate) {
        $scope.unitsAlternate = $scope.units;
      }

      // Subscribe to values and overrides.
      $scope.value = new TimeSeriesUpdater(
          $scope.recipeInstance, $scope.valueName, 'value',
          $scope.historyTime);

      if ($scope.overridable) {
        $scope.valueOverride = new TimeSeriesUpdater(
            $scope.recipeInstance, $scope.valueName, 'override',
            $scope.historyTime);
      }

      if ($scope.valueAlternateName && $scope.valueAlternateFunction) {
        throw new Error(
          'Only one of ("valueAlternatName", "valueAlternateFunction") may be'
          + ' specified.');
      }
      if ($scope.valueAlternateName) {
        $scope.valueAlternate = new TimeSeriesUpdater(
            $scope.recipeInstance, $scope.valueAlternateName, 'value');
      }
      if ($scope.valueAlternateFunction) {
        $scope.valueAlternate = {};
        $scope.$watch('value.latest', function updateAlternateValue() {
          $scope.valueAlternate.latest = $scope.valueAlternateFunction(
              $scope.value.latest);
        });
      }

      if ($scope.overridableAlternate) {
        $scope.valueOverride = new TimeSeriesUpdater(
            $scope.recipeInstance, $scope.valueAlternateName, 'override');
      }

      if ($scope.overridable || $scope.overridableAlternate) {
        $scope.increaseValue = increaseValue;
        $scope.decreaseValue = decreaseValue;
        $scope.toggleOverride = toggleOverride;
        $scope.setValue = setValue;
      }

      function toggleOverride(callback) {
        $scope.valueOverride.set(!$scope.valueOverride.latest, callback);
      }

      function setValue(value) {
        const valueToSet = ($scope.overridable ?
            $scope.value : $scope.valueAlternate);
        // Make sure we have the override set.
        if (!$scope.valueOverride.latest) {
          $scope.toggleOverride(() => valueToSet.set(value));
        } else {
          valueToSet.set(value);
        }
      }

      function increaseValue() {
        const currentValue = ($scope.overridable ?
            $scope.value.latest : $scope.valueAlternate.latest);
        $scope.setValue(currentValue + 1.0);
      }

      function decreaseValue() {
        const currentValue = ($scope.overridable ?
            $scope.value.latest : $scope.valueAlternate.latest);
        $scope.setValue(currentValue - 1.0);
      }
    },
  };
}
