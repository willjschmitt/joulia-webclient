(function loadSidebarSubMenu() {
  angular
    .module('app.common')
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
}());
