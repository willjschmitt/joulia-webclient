import angular = require('angular');

import '../templates';

angular
  .module('app.sidebar.userbox', ['app.templates',])
  .directive('sidebarUserbox', sidebarUserbox);

function sidebarUserbox() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      user: '=',
    },
    templateUrl: 'sidebar/sidebar-userbox.tpl.html',
    link: function sidebarUserboxController($scope) {
      $scope.fullName = fullName;

      function fullName(user) {
        return user ? `${user.first_name} ${user.last_name}` : '';
      }
    },
  };
}
