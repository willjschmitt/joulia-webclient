(function loadBrewhouseInactiveDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseInactive', brewhouseInactive);

  brewhouseInactive.$inject = [];

  function brewhouseInactive() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'brewhouse/brewhouse-inactive.tpl.html',
      link: function brewhouseInactiveController() {},
    };
  }
}());
