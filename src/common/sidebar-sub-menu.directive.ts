sidebarSubMenu.$inject = [];

export function sidebarSubMenu() {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {},
    templateUrl: 'common/sidebar-sub-menu.tpl.html',
    link: function sidebarSubMenuController() {
    },
  };
}
