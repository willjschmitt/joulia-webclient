(function loadBrewhouseTerminatorDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseEmergencyStop', brewhouseEmergencyStop);

  brewhouseEmergencyStop.$inject = ['TimeSeriesUpdater'];

  function brewhouseEmergencyStop(TimeSeriesUpdater) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipeInstance: '=',
      },
      templateUrl: 'brewhouse/brewhouse-emergency-stop.tpl.html',
      link: function brewhouseTerminatorController($scope) {
        $scope.emergencyStopStatus = new TimeSeriesUpdater(
            $scope.recipeInstance, 'emergency_stop', 'value');

        $scope.toggleEmergencyStop = toggleEmergencyStop;

        function toggleEmergencyStop() {
          // TODO(willjschmitt): Make lights and sirens go off when toggled on.
          $scope.emergencyStopStatus.set(!$scope.emergencyStopStatus.latest);
        }
      },
    };
  }
}());
