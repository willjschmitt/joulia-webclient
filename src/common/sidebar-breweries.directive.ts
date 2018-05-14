sidebarBreweries.$inject = ['breweryResources'];

export function sidebarBreweries(breweryResources) {
  return {
    restrict: 'A',
    transclude: true,
    scope: {},
    templateUrl: 'common/sidebar-breweries.tpl.html',
    link: function sidebarBreweriesController($scope) {
      $scope.brewerys = breweryResources.Brewery.query(getBrewhouses);
      $scope.brewhouseMap = {};

      /**
       * Retrieve all the brewhouses. Should be called after retrieving all
       * the brewerys. Will call mapBreweryToBrewhouse as a successful
       * callback, so it can map brewery's to brewhouse's.
       */
      function getBrewhouses() {
        breweryResources.Brewhouse.query(
            brewhouses => mapBreweryToBrewhouse($scope.brewerys, brewhouses));
      }

      /**
       * Generates a map of Brewery pk's to an array of Brewhouse's in the
       * Brewery. Assigns to $scope.brewhouseMap when complete.
       *
       * @param{[]Object} brewerys   Array of Brewery objects from server that
       *     contains the brewhouse's.
       * @param{[]Object} brewhouses Array of Brewhouse objects from server
       *     that are contained by the brewery's.
       */
      function mapBreweryToBrewhouse(brewerys, brewhouses) {
        const newBrewhouseMap = {};
        _.each(brewerys, function initializeBrewery(brewery) {
          newBrewhouseMap[brewery.id] = [];
        });

        _.each(brewhouses, function addBreweryToMap(brewhouse) {
          newBrewhouseMap[brewhouse.brewery].push(brewhouse);
        });

        // TODO(willjschmitt): Add sorting to the arrays in breweryMap.

        // Assign at the end so no updates take place until everything is
        // calculated.
        $scope.brewhouseMap = newBrewhouseMap;
      }
    },
  };
}
