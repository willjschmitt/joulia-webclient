publicMobile.$inject = [];

export function publicMobile() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'public/public-mobile.tpl.html',
    link: function publicMobileController() {},
  };
}
