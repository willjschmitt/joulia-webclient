(function loadSidebarDirective() {
  angular
    .module('app.common')
    .directive('sidebar', sidebar);

  sidebar.$inject = ['breweryResources'];

  function sidebar(breweryResources) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        user: '=',
      },
      templateUrl: 'common/sidebar.tpl.html',
      link: function sidebarController($scope) {
        $scope.brewerys = breweryResources.Brewery.query(getBrewhouses);
        $scope.brewhouseMap = {};

        $scope.fullName = fullName;

        function getBrewhouses() {
          breweryResources.Brewery.query(
              brewhouses => mapBreweryToBrewhouse($scope.brewerys, brewhouses));
        }

        function fullName(user) {
          return `${user.first_name} ${user.last_name}`;
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
}());
