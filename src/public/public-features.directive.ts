publicFeatures.$inject = [];

export function publicFeatures() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'public/public-features.tpl.html',
    link: function publicFeaturesController() {},
  };
}
