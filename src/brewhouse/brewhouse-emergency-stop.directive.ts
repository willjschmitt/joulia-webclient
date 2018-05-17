brewhouseEmergencyStop.$inject = ['TimeSeriesUpdater'];

export function brewhouseEmergencyStop(TimeSeriesUpdater) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      recipeInstance: '=',

      // The number of seconds to filter on (negative indicating the past) for
      // requesting historical data.
      historyTime: '=',
    },
    templateUrl: 'brewhouse/brewhouse-emergency-stop.tpl.html',
    link: function brewhouseTerminatorController($scope) {
      $scope.emergencyStopStatus = new TimeSeriesUpdater(
          $scope.recipeInstance, 'emergency_stop', 'value',
          $scope.historyTime);

      $scope.toggleEmergencyStop = toggleEmergencyStop;

      function toggleEmergencyStop() {
        // TODO(willjschmitt): Make lights and sirens go off when toggled on.
        $scope.emergencyStopStatus.set(!$scope.emergencyStopStatus.latest);
      }
    },
  };
}