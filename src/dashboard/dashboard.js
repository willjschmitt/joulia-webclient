(function loadDashboardController() {
  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['breweryResources', '$uibModal'];

  function DashboardController(breweryResources, $uibModal) {
    const vm = this;
    vm.brewerys = [];
    // Map of brewery.id's to array of brewhouses in them.
    vm.brewhouses = {};
    // Empty dict for which brewhouses to show the keys for.
    vm.showBrewhouseTokens = {};
    vm.toggleShowBrewhouseToken = toggleShowBrewhouseToken;
    vm.addBrewery = addBrewery;
    vm.addBrewhouse = addBrewhouse;
    updateBrewerys();
    // Initializes all the tooltips dynamically loaded, etc.
    window.bematadmin.App.init();

    /**
     * Queries the server and updates the brewerys variable with the results.
     * Calls initializeBrewerys when done.
     */
    function updateBrewerys() {
      vm.brewerys = breweryResources.Brewery.query(initializeBrewerys);
    }

    /**
     * For each of the brewerys, calls getBrewhouses, setting the array of
     * brewhouses on each brewery key in brewhouses.
     */
    function initializeBrewerys() {
      vm.brewhouses = {};
      _.each(vm.brewerys, brewery => getBrewhouses(brewery));
    }

    /**
     * Sets the array of brewhouse's on the key for brewery.id in brewhouses by
     * querying the server.
     * @param {object} brewery The brewery to query the server for related
     *                         brewhouses.
     */
    function getBrewhouses(brewery) {
      vm.brewhouses[brewery.id] = breweryResources.Brewhouse.query(
          { brewery: brewery.id });
    }

    /**
     * Toggles the show status for the authentication token for the brewhouse.
     * If show status is not set, sets it to true.
     * @param {number} brewhouseId The id for the brewhouse to toggle.
     */
    function toggleShowBrewhouseToken(brewhouseId) {
      if (!vm.showBrewhouseTokens.hasOwnProperty(brewhouseId)) {
        vm.showBrewhouseTokens[brewhouseId] = true;
      } else {
        vm.showBrewhouseTokens[brewhouseId] =
            !vm.showBrewhouseTokens[brewhouseId];
      }
    }

    /**
     * Launches a modal for user input to add a new brewery to a brewingCompany.
     */
    function addBrewery() {
      const modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'static/dashboard/add-brewery-modal.tpl.html',
        controller: 'AddBreweryModalController',
      });

      modalInstance.result.then(updateBrewerys);

      return modalInstance;
    }

    /**
     * Launches a modal for user input to add a new brewhouse to a brewery.
     * @param{object} brewery The brewery to add a new brewhouse to.
     */
    function addBrewhouse(brewery) {
      const modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'static/dashboard/add-brewhouse-modal.tpl.html',
        controller: 'AddBrewhouseModalController',
        resolve: {
          brewery: brewery,
        },
      });

      modalInstance.result.then(initializeBrewerys);

      return modalInstance;
    }
  }
}());
