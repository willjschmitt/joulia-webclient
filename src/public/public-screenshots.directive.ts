import * as angular from 'angular';
import 'owl.carousel';

angular
  .module('app.public.screenshots', ['app.templates',])
  .directive('publicScreenshots', publicScreenshots);

publicScreenshots.$inject = [];

function publicScreenshots() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'public/public-screenshots.tpl.html',
    link: function publicScreenshotsController() {
      $('#owl-screenshot').owlCarousel({
        items: 4,
        margin: 5,
        loop: true,
      });
    },
  };
}
