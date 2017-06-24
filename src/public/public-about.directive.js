(function loadpublicAboutDirective() {
  angular
    .module('app.public')
    .directive('publicAbout', publicAbout);

  publicAbout.$inject = [];

  function publicAbout() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'public/public-about.tpl.html',
      link: function publicAboutController() {},
    };
  }
}());
