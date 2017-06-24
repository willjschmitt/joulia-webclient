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
      link: function publicScreenshotsController() {},
    };
  }
}());
