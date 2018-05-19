import angular = require('angular');

angular
  .module('app.public.mobile', ['app.templates',])
  .directive('publicMobile', publicMobile);

publicMobile.$inject = [];

function publicMobile() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'public/public-mobile.tpl.html',
    link: function publicMobileController() {},
  };
}
