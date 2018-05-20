import angular = require('angular');

import '../templates';
import '../common/time-series-updater.factory';

angular
  .module('app.brewhouse.equipment-measurement',
    [
      'app.templates',
      'app.common.time-series-updater',
    ])
  .directive('brewhouseEquipmentMeasurement', brewhouseEquipmentMeasurement);

brewhouseEquipmentMeasurement.$inject = ['TimeSeriesUpdater'];

function brewhouseEquipmentMeasurement(TimeSeriesUpdater) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      // The recipe instance object, which has the id for the active recipe
      // instance, which will be queried against for the measurement data.
      recipeInstance: '=',

      // The human readable name for the value. Used as a label for the value.
      label: '=',

      // The units to display after the value.
      units: '=',

      // The variable name to query and display the value for.
      valueName: '=',

      // The number of seconds to filter on (negative indicating the past) for
      // requesting historical data.
      historyTime: '=',
    },
    templateUrl: 'brewhouse/brewhouse-equipment-measurement.tpl.html',
    link: function brewhouseEquipmentMeasurementController($scope) {
      $scope.value = new TimeSeriesUpdater(
          $scope.recipeInstance.id, $scope.valueName, 'value',
          $scope.historyTime);
    },
  };
}
