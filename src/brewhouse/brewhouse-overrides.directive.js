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
      templateUrl: 'brewhouse/brewhouse-overrides.tpl.html',
      link: function brewhouseOverridesController() {},
    };
  }
}());
