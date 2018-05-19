publicScreenshots.$inject = [];

export function publicScreenshots() {
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
