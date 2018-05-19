sidebarBrewery.$inject = [];

export function sidebarBrewery() {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      brewery: '=',
      brewhouses: '=',
    },
    templateUrl: 'common/sidebar-brewery.tpl.html',
    link: function sidebarBreweryController($scope, $element) {
      $scope.brewhousesClass = 'hide-sub-menu';
      $scope.toggleBrewhouses = function toggleBrewhouses() {
        if ($scope.brewhousesClass === 'show-sub-menu') {
          $element.removeClass('open');
          $scope.brewhousesClass = 'hide-sub-menu';
        } else {
          $element.addClass('open');
          $scope.brewhousesClass = 'show-sub-menu';
        }
      };
    },
  };
}
