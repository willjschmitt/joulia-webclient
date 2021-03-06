import * as angular from 'angular';

import '../templates';
import '../common/dial.directive';
import '../common/time-series-updater.factory';

angular
  .module('app.brewhouse.dials',
    [
      'app.templates',
      'app.common.dial',
      'app.common.time-series-updater',
    ])
  .directive('brewhouseDials', brewhouseDials);

brewhouseDials.$inject = ['TimeSeriesUpdater'];

function brewhouseDials(TimeSeriesUpdater) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      recipeInstance: '=',

      // The number of seconds to filter on (negative indicating the past) for
      // requesting historical data.
      historyTime: '=',
    },
    templateUrl: 'brewhouse/brewhouse-dials.tpl.html',
    link: function brewhouseDialsController($scope) {
      $scope.boilKettleDutyCycle = new TimeSeriesUpdater(
          $scope.recipeInstance, 'boil_kettle__duty_cycle', 'value',
          $scope.historyTime);
    },
  };
}
