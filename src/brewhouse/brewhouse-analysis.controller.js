(function loadBrewhouseAnalysisController() {
  angular
    .module('app.brewhouse')
    .controller('BrewhouseAnalysisController', BrewhouseAnalysisController);

  BrewhouseAnalysisController.$inject = ['$scope'];

  function BrewhouseAnalysisController($scope) {
    // TODO(willjschmitt): Make this configurable based on URL parameters, etc.
    $scope.historyTime = -60.0 * 60.0 * 2.0;  // 2 Hours.
  }
}());
