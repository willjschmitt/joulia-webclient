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
        /**
         * The brewhouse being displayed.
         */
        brewhouse: '=',

        /**
         * The list of brewhouses the brewhouse is a part of, so the brewhouse
         * can be deleted from it in the event of a delete.
         */
        brewhouses: '=',
      },
      templateUrl: 'dashboard/dashboard-brewhouse.tpl.html',
      link: function dashboardBrewhouseController($scope) {
        $scope.showToken = false;
        $scope.toggleShowToken = toggleShowToken;
        $scope.editBrewhouse = editBrewhouse;
        $scope.deleteBrewhouse = deleteBrewhouse;

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

        /**
         * Deletes the current brewhouse.
         */
        function deleteBrewhouse() {
          const modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'common/confirm-delete-modal.tpl.html',
            controller: 'ConfirmDeleteController',
            resolve: {
              name: function () { return $scope.brewhouse.name; },
            },
          });

          modalInstance.result
            .then(() => {
              const index = $scope.brewhouses.indexOf($scope.brewhouse);
              if (index === -1) {
                throw new Error('Brewhouse not in brewhouses.');
              }
              $scope.brewhouse.$delete();
              $scope.brewhouses.splice(index, 1);
            });
        }
      },
    };
  }
}());
