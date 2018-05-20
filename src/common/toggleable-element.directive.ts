import angular = require('angular');

import '../templates'

angular
  .module('app.common.toggleable-element',
    [
      'app.templates',
    ])
  .directive('toggleableElement', toggleableElement);

toggleableElement.$inject = ['TimeSeriesUpdater'];

function toggleableElement(TimeSeriesUpdater) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      name: '=',
      recipeInstance: '=',
      sensorName: '=',

      // The number of seconds to filter on (negative indicating the past) for
      // requesting historical data.
      historyTime: '=',
    },
    templateUrl: 'common/toggleable-element.tpl.html',
    link: function toggleableElementController($scope) {
      // Subscribe to value and override.
      $scope.elementStatus = new TimeSeriesUpdater(
          $scope.recipeInstance, $scope.sensorName, 'value',
          $scope.historyTime);
      $scope.elementOverride = new TimeSeriesUpdater(
          $scope.recipeInstance, $scope.sensorName, 'override',
          $scope.historyTime);

      // Status setters.
      $scope.toggleElementStatus = toggleElementStatus;
      $scope.setElementStatus = setElementStatus;

      // Override setters.
      $scope.toggleElementOverride = toggleElementOverride;
      $scope.setElementOverride = setElementOverride;

      /**
       * Toggles the current element status to the inverse of itself.
       */
      function toggleElementStatus() {
        setElementStatus(!$scope.elementStatus.latest);
      }

      /**
       * Sets the element status to the provided value. If the override is not
       * set on the value currently, applies the override to true, providing
       * the set function as a callback for future calling.
       * @param {boolean} statusValue The boolean value to set to the current
       *                              element status.
       */
      function setElementStatus(statusValue) {
        function sendValue() {
          $scope.elementStatus.set(statusValue);
        }

        // Make sure we have the override set before sending the value.
        // Provides callback to sendValue if it wasn't. Otherwise immediately
        // sendValue's.
        if (!$scope.elementOverride.latest) {
          toggleElementOverride(sendValue);
        } else {
          sendValue();
        }
      }

      /**
       * Toggles the current element override value to the inverse of itself.
       */
      function toggleElementOverride(callback) {
        setElementOverride(!$scope.elementOverride.latest, callback);
      }

      /**
       * Sets the element status override to the provided value. Provides
       * callback with sending of value to server.
       * @param {boolean}  overrideValue The value for the override to set.
       * @param {function} callback      Function to call after setting.
       */
      function setElementOverride(overrideValue, callback) {
        $scope.elementOverride.set(overrideValue, callback);
      }
    },
  };
}
