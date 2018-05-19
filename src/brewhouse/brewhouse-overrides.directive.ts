brewhouseOverrides.$inject = [];

export function brewhouseOverrides() {
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
