(function loadBrewhouseDialsDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseDials', brewhouseDials);

  brewhouseDials.$inject = ['TimeSeriesUpdater'];

  function brewhouseDials(TimeSeriesUpdater) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'static/brewhouse/brewhouse-dials.html',
      link: function brewhouseDialsController($scope) {
        $scope.boilKettleDutyCycle = new TimeSeriesUpdater(
            $scope.recipeInstance.id, 'boil_kettle__duty_cycle');
        $scope.boilKettlePower = new TimeSeriesUpdater(
            $scope.recipeInstance.id, 'boil_kettle__power');
      },
    };
  }
}());