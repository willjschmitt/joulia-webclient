(function loadBrewhouseAnalysisDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseAnalysis', brewhouseAnalysis);

  brewhouseAnalysis.$inject = [];

  function brewhouseAnalysis() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipeInstance: '=',
      },
      templateUrl: 'brewhouse/brewhouse-analysis.tpl.html',
      link: function brewhouseAnalysisController() {},
    };
  }
}());
