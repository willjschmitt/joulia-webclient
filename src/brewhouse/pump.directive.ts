import angular = require('angular');

import '../templates';
import '../common/time-series-updater.factory';

angular
  .module('app.brewhouse.pump',
    [
      'app.templates',
      'app.common.time-series-updater'
    ])
  .directive('pump', pump);

pump.$inject = ['TimeSeriesUpdater'];

function pump(TimeSeriesUpdater) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      // The human readable name for the kettle, which will be displayed as a
      // title element.
      label: '=',

      // The computer name for the equipment, which will be prepended to the
      // sensor names for monitoring values. For example, providing
      // 'main_pump' will query for things like 'main_pump__pumpStatus'.
      name: '=',

      // The recipe instance object, which has the id for the active recipe
      // instance, which will be queried against for the measurement data.
      recipeInstance: '=',

      // The number of seconds to filter on (negative indicating the past) for
      // requesting historical data.
      historyTime: '=',
    },
    templateUrl: 'brewhouse/pump.tpl.html',
    link: function pumpController($scope) {
      $scope.pumpStatus = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'pumpStatus', 'value', $scope.historyTime);
    },
  };
}
