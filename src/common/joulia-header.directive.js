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
        $scope.toggleSidebarClass = 'SidebarOpen';

        $scope.toggleSidebar = toggleSidebar;

        function fullName(user) {
          return `${user.first_name} ${user.last_name}`;
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
