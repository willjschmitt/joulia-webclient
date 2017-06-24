(function loadDashboardController() {
  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = [
    '$scope', 'breweryResources', 'userService', '$uibModal'];

  function DashboardController($scope, breweryResources, userService,
      $uibModal) {
    console.log('dashing');
    $scope.userService = userService;

    $scope.brewerys = [];
    // Map of brewery.id's to array of brewhouses in them.
    $scope.brewhouses = {};
    $scope.addBrewery = addBrewery;
    updateBrewerys();

    /**
     * Queries the server and updates the brewerys variable with the results.
     * Calls initializeBrewerys when done.
     */
    function updateBrewerys() {
      $scope.brewerys = breweryResources.Brewery.query(initializeBrewerys);
    }

    /**
     * For each of the brewerys, calls getBrewhouses, setting the array of
     * brewhouses on each brewery key in brewhouses.
     */
    function initializeBrewerys() {
      $scope.brewhouses = {};
      _.each($scope.brewerys, brewery => getBrewhouses(brewery));
    }

    /**
     * Sets the array of brewhouse's on the key for brewery.id in brewhouses by
     * querying the server.
     * @param {object} brewery The brewery to query the server for related
     *                         brewhouses.
     */
    function getBrewhouses(brewery) {
      $scope.brewhouses[brewery.id] = breweryResources.Brewhouse.query(
          { brewery: brewery.id });
    }

    /**
     * Launches a modal for user input to add a new brewery to a brewingCompany.
     */
    function addBrewery() {
      const modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'dashboard/add-brewery-modal.tpl.html',
        controller: 'AddBreweryModalController',
      });

      modalInstance.result.then(updateBrewerys);

      return modalInstance;
    }
  }
}());
