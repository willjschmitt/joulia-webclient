angular
  .module('app.common')
  .directive('toggleableElement', toggleableElement);

toggleableElement.$inject = ['timeSeriesUpdater', 'breweryApi'];

function toggleableElement(timeSeriesUpdater, breweryApi) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      name: "=",
      recipeInstance: "=",
      sensorName: "=",
    },
    templateUrl: 'static/html/angular-directives/toggleable-element.html',
    link: function ($scope) {
      // Subscribe to value and override.
      $scope.elementStatus = new timeSeriesUpdater(
          $scope.recipeInstance,$scope.sensorName);
      $scope.elementOverride = new timeSeriesUpdater(
          $scope.recipeInstance,$scope.sensorName + "Override");

      // Status setters.
      $scope.toggleElementStatus = function() {
        $scope.setElementStatus(!$scope.elementStatus.latest);
      };
      $scope.setElementStatus = function(statusValue) {
        function __setElementStatus(statusValue) {
          var now = moment().toISOString();
          var data = {
            recipe_instance: $scope.recipeInstance,
            sensor: $scope.elementStatus.sensor,
            value: statusValue,
            time: now,
          };
          var newData = new breweryApi.timeSeriesDataPoint(data);
          newData.$save();
        }

        // Make sure we have the override set.
        if (!$scope.elementOverride.latest) {
          $scope.toggleElementOverride(function() {
            __setElementStatus(statusValue);
          });
        } else {
          __setElementStatus(statusValue);
        }
      };

      // Override setters.
      $scope.toggleElementOverride = function(callback) {
        $scope.setElementOverride(!$scope.elementOverride.latest,callback);
      };
      $scope.setElementOverride = function(overrideValue, callback) {
        var now = moment().toISOString();
        var data = {
          recipe_instance: $scope.recipeInstance,
          sensor: $scope.elementOverride.sensor,
          value: overrideValue,
          time: now,
        };
        var newData = new breweryApi.timeSeriesDataPoint(data);
        newData.$save(function(){
          if (callback) callback(); 
        });
      }
    }
  };
}
