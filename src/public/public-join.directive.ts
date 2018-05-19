publicJoin.$inject = [];

export function publicJoin() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'public/public-join.tpl.html',
    link: function publicJoinController() {},
  };
}
