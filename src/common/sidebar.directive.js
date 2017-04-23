(function loadSidebarDirective() {
  angular
    .module('app.common')
    .directive('sidebar', sidebar);

  sidebar.$inject = ['$rootScope'];

  function sidebar($rootScope) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        user: '=',
      },
      templateUrl: 'common/sidebar.tpl.html',
      link: function sidebarController($scope) {
        $scope.sidebarClass = 'SidebarOpen';

        $scope.toggleSidebar = toggleSidebar;

        function toggleSidebar() {
          $rootScope.$broadcast('toggleSidebar');
        }

        $scope.$on('toggleSidebar', function handleToggleSidebar() {
          if ($scope.sidebarClass === 'SidebarOpen') {
            $scope.sidebarClass = 'SidebarClose';
          } else {
            $scope.sidebarClass = 'SidebarOpen';
          }
        });
      },
    };
  }
}());
