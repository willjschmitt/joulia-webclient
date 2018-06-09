import angular = require('angular');

import '../templates';
import './sidebar-sub-menu.component';

angular
  .module('app.sidebar.brewery',
    [
      'app.templates',
      'app.sidebar.sub-menu',
    ])
  .directive('sidebarBrewery', sidebarBrewery);

sidebarBrewery.$inject = [];

function sidebarBrewery() {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      brewery: '=',
      brewhouses: '=',
    },
    templateUrl: 'sidebar/sidebar-brewery.tpl.html',
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
