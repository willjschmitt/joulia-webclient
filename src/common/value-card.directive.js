angular
  .module("app.common")
  .directive('valueCard', ['timeSeriesUpdater', 'breweryApi', valueCard]);

function valueCard(timeSeriesUpdater, breweryApi) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: "=",
      valueName: "=",
      valueAlternateName: "=?",
      units: "=",
      unitsAlternate: "=?",
      overridable:"=?",
      overridableAlternate:"=?",
      recipeInstance:'=',
    },
    templateUrl: 'static/html/angular-directives/value-card.html',
    link: function ($scope) {
      if (!$scope.unitsAlternate) {
        $scope.unitsAlternate= $scope.units;
      }

      // Subscribe to value and override.
      $scope.value = new timeSeriesUpdater(
          $scope.recipeInstance,$scope.valueName);
      if ($scope.overridable){
        $scope.valueOverride = new timeSeriesUpdater(
            $scope.recipeInstance, $scope.valueName + "Override");
      }
      if ($scope.valueAlternateName) {
        $scope.valueAlternate = new timeSeriesUpdater(
            $scope.recipeInstance,$scope.valueAlternateName);
      }
      if ($scope.overridableAlternate) {
        $scope.valueOverride = new timeSeriesUpdater(
            $scope.recipeInstance,$scope.valueAlternateName + "Override");
      }


      if ($scope.overridable || $scope.overridableAlternate) {
        $scope.overridden = false;
        $scope.increase_value = function() {
          var currentValue = ($scope.overridable ?
              $scope.value.latest : $scope.valueAlternate.latest);
          $scope.setValue(currentValue + 1.0);
        };
        $scope.decrease_value = function() {
          var currentValue = ($scope.overridable ?
              $scope.value.latest : $scope.valueAlternate.latest);
          $scope.setValue(currentValue - 1.0);
        };
      }

      $scope.setValue = function(value) {
        function __setValue(value) {
          var now = moment().toISOString();
          var sensor = ($scope.overridable ?
              $scope.value.sensor : $scope.valueAlternate.sensor);
          var data = {
            recipe_instance: $scope.recipeInstance,
            sensor: sensor
            value: value,
              time: now,
          };
          var newData = new breweryApi.timeSeriesDataPoint(data);
          newData.$save();
        }

        // Make sure we have the override set.
        if (!$scope.valueOverride.latest) {
          $scope.toggleOverride(function(){__setValue(value);});
        } else {
          __setValue(value);
        }
      };

      // Override setters.
      $scope.toggleOverride = function(callback) {
        $scope.setOverride(!$scope.valueOverride.latest, callback);
      };

      $scope.setOverride = function(value, callback) {
        var now = moment().toISOString();
        var data = {
          recipe_instance: $scope.recipeInstance,
          sensor: $scope.valueOverride.sensor,
          value: value,
          time: now,
        };
        var newData = new breweryApi.timeSeriesDataPoint(data);
        newData.$save(function(){
          if (callback) {
            callback();
          }
        });
      }

      // Give us all the little line things for the little cards.
      $(".peity-line").peity("line", {height: 28, width: 64});
    }
  };
};
