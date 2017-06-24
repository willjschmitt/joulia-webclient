(function loadpublicFeaturesDirective() {
  angular
    .module('app.public')
    .directive('publicFeatures', publicFeatures);

  publicFeatures.$inject = [];

  function publicFeatures() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'public/public-features.tpl.html',
      link: function publicFeaturesController() {},
    };
  }
}());
