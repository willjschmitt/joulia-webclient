import * as angular from 'angular';

import '../templates';
import '../common/toggleable-element.directive';

angular
  .module('app.brewhouse.overrides',
    [
      'app.templates',
      'app.common.toggleable-element',
    ])
  .directive('brewhouseOverrides', brewhouseOverrides);

brewhouseOverrides.$inject = [];

function brewhouseOverrides() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      recipeInstance: '=',

      // The number of seconds to filter on (negative indicating the past) for
      // requesting historical data.
      historyTime: '=',
    },
    templateUrl: 'brewhouse/brewhouse-overrides.tpl.html',
    link: function brewhouseOverridesController() {},
  };
}
