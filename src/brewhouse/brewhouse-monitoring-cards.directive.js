(function loadBrewhouseMonitoringCardsDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseMonitoringCards', brewhouseMonitoringCards);

  brewhouseMonitoringCards.$inject = [];

  function brewhouseMonitoringCards() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipeInstance: '=',
      },
      templateUrl: 'brewhouse/brewhouse-monitoring-cards.tpl.html',
      link: function brewhouseMonitoringCardsController() {},
    };
  }
}());
