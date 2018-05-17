export function sidebarUserbox() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      user: '=',
    },
    templateUrl: 'common/sidebar-userbox.tpl.html',
    link: function sidebarUserboxController($scope) {
      $scope.fullName = fullName;

      function fullName(user) {
        return user ? `${user.first_name} ${user.last_name}` : '';
      }
    },
  };
}