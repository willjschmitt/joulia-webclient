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
        recipeInstance: "=",
      },
      templateUrl: 'static/brewhouse/brewhouse-monitoring-cards.html',
      link: function brewhouseMonitoringCardsController() {},
    };
  }
}());
