import * as angular from 'angular';

angular
  .module('app.public.join', ['app.templates',])
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
