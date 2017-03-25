(function loadToggleableElementDirective() {
  angular
    .module('app.common')
    .directive('toggleableElement', toggleableElement);

  toggleableElement.$inject = ['TimeSeriesUpdater', 'breweryApi'];

  function toggleableElement(TimeSeriesUpdater, breweryApi) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        name: '=',
        recipeInstance: '=',
        sensorName: '=',
      },
      templateUrl: 'static/html/angular-directives/toggleable-element.html',
      link: function toggleableElementController($scope) {
        // Subscribe to value and override.
        $scope.elementStatus = new TimeSeriesUpdater(
            $scope.recipeInstance, $scope.sensorName);
        $scope.elementOverride = new TimeSeriesUpdater(
            $scope.recipeInstance, `${$scope.sensorName}Override`);

        // Status setters.
        $scope.toggleElementStatus = toggleElementStatus;
        $scope.setElementStatus = setElementStatus;

        // Override setters.
        $scope.toggleElementOverride = toggleElementOverride;
        $scope.setElementOverride = setElementOverride;

        function toggleElementStatus() {
          setElementStatus(!$scope.elementStatus.latest);
        }

        function setElementStatus(statusValue) {
          function sendValue() {
            sendValueToServer($scope.elementStatus.sensor, statusValue);
          }

          // Make sure we have the override set.
          if (!$scope.elementOverride.latest) {
            toggleElementOverride(sendValue);
          } else {
            sendValue();
          }
        }

        function toggleElementOverride(callback) {
          setElementOverride(!$scope.elementOverride.latest, callback);
        }

        function setElementOverride(overrideValue, callback) {
          sendValueToServer($scope.elementOverride.sensor, overrideValue,
                            callback);
        }

        function sendValueToServer(sensor, value, callback) {
          const now = moment().toISOString();
          const data = {
            recipe_instance: $scope.recipeInstance,
            sensor: sensor,
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
      },
    };
  }
}());
