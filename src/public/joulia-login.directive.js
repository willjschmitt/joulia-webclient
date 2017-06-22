(function loadJouliaLoginDirective() {
  angular
    .module('app.public')
    .directive('jouliaLogin', jouliaLogin);

  jouliaLogin.$inject = [];

  function jouliaLogin() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        user: '=',
      },
      templateUrl: 'public/joulia-login.tpl.html',
      link: function jouliaLoginController() {},
    };
  }
}());
