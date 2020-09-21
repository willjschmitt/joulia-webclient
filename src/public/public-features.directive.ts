import * as angular from 'angular';

angular
  .module('app.public.features', ['app.templates',])
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
