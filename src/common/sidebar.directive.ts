import angular = require('angular');
import * as $ from 'jquery';

import '../templates';
import './sidebar-userbox.directive';
import './sidebar-breweries.directive';

angular
  .module('app.common.sidebar',
    [
      'app.templates',
      'app.common.sidebar-userbox',
      'app.common.sidebar-breweries',
    ])
  .directive('sidebar', sidebar);

sidebar.$inject = ['$rootScope', '$document'];

function sidebar($rootScope, $document) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      user: '=',
    },
    templateUrl: 'common/sidebar.tpl.html',
    link: function sidebarController($scope) {
      $scope.toggleSidebar = toggleSidebar;
      handleToggleSidebar();

      // bemat-admin-common.min.js should have applied this but doing this as
      // a workaround.
      $('body').on('click', '#sidebar-backdrop', $scope.toggleSidebar);

      $scope.$on('toggleSidebar', handleToggleSidebar);

      function toggleSidebar() {
        $rootScope.$broadcast('toggleSidebar');
      }

      function handleToggleSidebar() {
        if ($scope.sidebarClass === 'SidebarOpen') {
          $scope.sidebarClass = 'SidebarClose';
          // bemat-admin-common.min.js should have applied this but doing this
          // as a workaround.
          $('body')
            .removeClass('sidebar-open')
            .addClass('sidebar-close');
        } else {
          $scope.sidebarClass = 'SidebarOpen';
          // bemat-admin-common.min.js should have applied this but doing this
          // as a workaround.
          $('body')
            .removeClass('sidebar-close')
            .addClass('sidebar-open');
        }
      }
    },
  };
}
