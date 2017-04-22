(function loadDashboardBrewhouseDirective() {
  angular
    .module('app.dashboard')
    .directive('dashboardBrewhouse', dashboardBrewhouse);

  function dashboardBrewhouse() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        brewhouse: '=',
      },
      templateUrl: 'dashboard/dashboard-brewhouse.tpl.html',
      link: function dashboardBrewhouseController($scope) {
        $scope.showToken = false;
        $scope.toggleShowToken = toggleShowToken;

        /**
         * Toggles the show status for the authentication token for the
         * brewhouse.
         */
        function toggleShowToken() {
          $scope.showToken = !$scope.showToken;
        }
      },
    };
  }
}());
