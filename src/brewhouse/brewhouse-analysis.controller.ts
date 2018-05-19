BrewhouseAnalysisController.$inject = ['$scope'];

export function BrewhouseAnalysisController($scope) {
  // TODO(willjschmitt): Make this configurable based on URL parameters, etc.
  $scope.historyTime = -60.0 * 15.0;  // 15 Minutes.
}
