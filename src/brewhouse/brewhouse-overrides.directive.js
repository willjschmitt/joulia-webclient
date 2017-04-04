(function loadBrewhouseOverridesDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseOverrides', brewhouseOverrides);

  brewhouseOverrides.$inject = [];

  function brewhouseOverrides() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipeInstance: '=',
      },
      templateUrl: 'static/brewhouse/brewhouse-overrides.html',
      link: function brewhouseOverridesController() {},
    };
  }
}());
