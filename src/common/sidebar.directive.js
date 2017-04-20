(function loadSidebarDirective() {
  angular
    .module('app.common')
    .directive('sidebar', sidebar);

  function sidebar() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        user: '=',
      },
      templateUrl: 'common/sidebar.tpl.html',
      link: function sidebarController() {},
    };
  }
}());
