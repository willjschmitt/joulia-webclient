(function loadJouliaLoginDirective() {
  angular
    .module('app.common')
    .directive('jouliaLogin', jouliaLogin);

  jouliaLogin.$inject = [];

  function jouliaLogin() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        user: '=',
      },
      templateUrl: 'common/joulia-login.tpl.html',
      link: function jouliaLoginController() {},
    };
  }
}());
