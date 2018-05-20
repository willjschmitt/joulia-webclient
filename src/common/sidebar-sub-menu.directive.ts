import angular = require('angular');

import '../templates';

angular
  .module('app.common.sidebar-sub-menu', ['app.templates',])
  .directive('sidebarSubMenu', sidebarSubMenu);

sidebarSubMenu.$inject = [];

function sidebarSubMenu() {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {},
    templateUrl: 'common/sidebar-sub-menu.tpl.html',
    link: function sidebarSubMenuController() {
    },
  };
}
