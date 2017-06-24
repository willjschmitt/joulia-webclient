(function loadpublicScreenshotsDirective() {
  angular
    .module('app.public')
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
          // 10 items above 1000px browser width.
          items: 4,
          // 5 items between 1120px and 941px.
          itemsDesktop: [1120, 3],
          // Between 940px and 601px.
          itemsDesktopSmall: [940, 2],
          // 2 items between 600 and 0.
          itemsTablet: [600, 2],
          // itemsMobile disabled - inherit from itemsTablet option.
          itemsMobile: [400, 1],
        });
      },
    };
  }
}());
