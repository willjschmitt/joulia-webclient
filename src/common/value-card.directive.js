(function loadValueCardDirective() {
  angular
    .module('app.common')
    .directive('valueCard', ['TimeSeriesUpdater', 'breweryApi', valueCard]);

  function valueCard(TimeSeriesUpdater, breweryApi) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        title: '=',
        valueName: '=',
        valueAlternateName: '=?',
        units: '=',
        unitsAlternate: '=?',
        overridable: '=?',
        overridableAlternate: '=?',
        recipeInstance: '=',
      },
      templateUrl: 'static/html/angular-directives/value-card.html',
      link: function valueCardController($scope) {
        // Give us all the little line things for the little cards.
        $('.peity-line').peity('line', { height: 28, width: 64 });

        if (!$scope.unitsAlternate) {
          $scope.unitsAlternate = $scope.units;
        }

        // Subscribe to value and override.
        $scope.value = new TimeSeriesUpdater(
            $scope.recipeInstance, $scope.valueName);
        if ($scope.overridable) {
          $scope.valueOverride = new TimeSeriesUpdater(
              $scope.recipeInstance, `${$scope.valueName}Override`);
        }
        if ($scope.valueAlternateName) {
          $scope.valueAlternate = new TimeSeriesUpdater(
              $scope.recipeInstance, $scope.valueAlternateName);
        }
        if ($scope.overridableAlternate) {
          $scope.valueOverride = new TimeSeriesUpdater(
              $scope.recipeInstance, `${$scope.valueAlternateName}Override`);
        }

        if ($scope.overridable || $scope.overridableAlternate) {
          $scope.overridden = false;
          $scope.increase_value = increaseValue;
          $scope.decrease_value = decreaseValue;
        }

        $scope.setValue = setValue;

        // Override setters.
        $scope.toggleOverride = toggleOverride;
        $scope.setOverride = setOverride;

        function toggleOverride(callback) {
          $scope.setOverride(!$scope.valueOverride.latest, callback);
        }

        function setOverride(value, callback) {
          const now = moment().toISOString();
          const data = {
            recipe_instance: $scope.recipeInstance,
            sensor: $scope.valueOverride.sensor,
            value: value,
            time: now,
          };
          const newData = new breweryApi.TimeSeriesDataPoint(data);
          newData.$save(function callbackIfExists() {
            if (callback) {
              callback();
            }
          });
        }

        function setValue(value) {
          function sendValueToServer() {
            const now = moment().toISOString();
            const sensor = ($scope.overridable ?
                $scope.value.sensor : $scope.valueAlternate.sensor);
            const data = {
              recipe_instance: $scope.recipeInstance,
              sensor: sensor,
              value: value,
              time: now,
            };
            const newData = new breweryApi.TimeSeriesDataPoint(data);
            newData.$save();
          }

          // Make sure we have the override set.
          if (!$scope.valueOverride.latest) {
            $scope.toggleOverride(sendValueToServer);
          } else {
            sendValueToServer();
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
}());
