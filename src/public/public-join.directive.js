(function loadpublicJoinDirective() {
  angular
    .module('app.public')
    .directive('publicJoin', publicJoin);

  publicJoin.$inject = [];

  function publicJoin() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'public/public-join.tpl.html',
      link: function publicJoinController() {},
    };
  }
}());
