(function loadDashboardBrewhouseDirective() {
  angular
    .module('app.dashboard')
    .directive('dashboardBrewhouse', dashboardBrewhouse);

  dashboardBrewhouse.$inject = ['$uibModal'];

  function dashboardBrewhouse($uibModal) {
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
        $scope.editBrewhouse = editBrewhouse;

        /**
         * Toggles the show status for the authentication token for the
         * brewhouse.
         */
        function toggleShowToken() {
          $scope.showToken = !$scope.showToken;
        }

        /**
         * Launches a modal for user input to add a new brewhouse to a brewery.
         * On success callback, adds new brewhouse to brewhouse array.
         * @param{object} brewery The brewery to add a new brewhouse to.
         */
        function editBrewhouse() {
          const modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'dashboard/edit-brewhouse-modal.tpl.html',
            controller: 'EditBrewhouseModalController',
            resolve: {
              brewery: null,
              brewhouse: $scope.brewhouse,
            },
          });

          return modalInstance;
        }
      },
    };
  }
}());
