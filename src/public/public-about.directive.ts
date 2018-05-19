publicAbout.$inject = [];

export function publicAbout() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'public/public-about.tpl.html',
    link: function publicAboutController() {},
  };
}
