import * as angular from 'angular';

import './brewhouse-dials.directive';
import './brewhouse-measurements.directive';
import './brewhouse-monitoring-cards.directive';
import './brewhouse-overrides.directive';
import './brewhouse-temperature-plots.directive';

angular
  .module('app.brewhouse.analysis',
    [
      'app.brewhouse.dials',
      'app.brewhouse.measurements',
      'app.brewhouse.monitoring-cards',
      'app.brewhouse.overrides',
      'app.brewhouse.temperature-plots',
    ])
  .controller('BrewhouseAnalysisController', BrewhouseAnalysisController);

BrewhouseAnalysisController.$inject = ['$scope'];

function BrewhouseAnalysisController($scope) {
  // TODO(willjschmitt): Make this configurable based on URL parameters, etc.
  $scope.historyTime = -60.0 * 15.0;  // 15 Minutes.
}
