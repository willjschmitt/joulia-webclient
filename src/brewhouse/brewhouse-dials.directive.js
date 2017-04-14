(function loadBrewhouseDialsDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseDials', brewhouseDials);

  brewhouseDials.$inject = ['TimeSeriesUpdater'];

  function brewhouseDials(TimeSeriesUpdater) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipeInstance: '=',
      },
      templateUrl: 'static/brewhouse/brewhouse-dials.tpl.html',
      link: function brewhouseDialsController($scope) {
        $scope.boilKettleDutyCycle = new TimeSeriesUpdater(
            $scope.recipeInstance, 'boil_kettle__duty_cycle');
      },
    };
  }
}());
