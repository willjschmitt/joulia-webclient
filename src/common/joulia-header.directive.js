(function loadJouliaHeaderDirective() {
  angular
    .module('app.common')
    .directive('jouliaHeader', jouliaHeader);

  jouliaHeader.$inject = ['$rootScope'];

  function jouliaHeader($rootScope) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        user: '=',
      },
      templateUrl: 'common/joulia-header.tpl.html',
      link: function jouliaHeaderController($scope) {
        $scope.fullName = fullName;
        $scope.fullscreenButton = 'fullscreen';
        $scope.toggleSidebarClass = 'SidebarOpen';

        $scope.toggleFullscreen = toggleFullscreen;
        $scope.toggleSidebar = toggleSidebar;

        function fullName(user) {
          return `${user.first_name} ${user.last_name}`;
        }

        /**
         * Toggles the window to full screen mode.
         */
        function toggleFullscreen() {
          screenfull.toggle();
          if ($scope.fullscreenButton === 'fullscreen') {
            $scope.fullscreenButton = 'fullscreen_exit';
          } else {
            $scope.fullscreenButton = 'fullscreen';
          }
        }

        function toggleSidebar() {
          $rootScope.$broadcast('toggleSidebar');
        }

        $scope.$on('toggleSidebar', function handleToggleSidebar() {
          if ($scope.toggleSidebarClass === 'SidebarOpen') {
            $scope.toggleSidebarClass = 'SidebarClose';
          } else {
            $scope.toggleSidebarClass = 'SidebarOpen';
          }
        });
      },
    };
  }
}());
