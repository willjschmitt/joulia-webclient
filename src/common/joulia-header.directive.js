(function loadJouliaHeaderDirective() {
  angular
    .module('app.common')
    .directive('jouliaHeader', jouliaHeader);

  jouliaHeader.$inject = [];

  function jouliaHeader() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        user: '=',
      },
      templateUrl: 'common/joulia-header.tpl.html',
      link: function jouliaHeaderController($scope) {
        $scope.fullName = fullName;

        function fullName(user) {
          return `${user.first_name} ${user.last_name}`;
        }
      },
    };
  }
}());
