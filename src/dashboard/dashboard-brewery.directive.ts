dashboardBrewery.$inject = ['$uibModal'];

export function dashboardBrewery($uibModal) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      brewery: '=',
      brewhouses: '=',
    },
    templateUrl: 'dashboard/dashboard-brewery.tpl.html',
    link: function dashboardBreweryController($scope) {
      $scope.addBrewhouse = addBrewhouse;

      /**
       * Launches a modal for user input to add a new brewhouse to a brewery.
       * On success callback, adds new brewhouse to brewhouse array.
       * @param{object} brewery The brewery to add a new brewhouse to.
       */
      function addBrewhouse() {
        const modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'dashboard/edit-brewhouse-modal.tpl.html',
          controller: 'EditBrewhouseModalController',
          resolve: {
            brewery: $scope.brewery,
            brewhouse: null,
          },
        });

        modalInstance.result
          .then(brewhouse => $scope.brewhouses.push(brewhouse));

        return modalInstance;
      }
    },
  };
}
