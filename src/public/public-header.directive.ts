(function loadpublicHeaderDirective() {
  angular
    .module('app.public')
    .directive('publicHeader', publicHeader);

  publicHeader.$inject = [];

  function publicHeader() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'public/public-header.tpl.html',
      link: function publicHeaderController() {
        $('#main-slider').flexslider({
          animation: 'fade',
          slideshowSpeed: 5500,
          controlNav: false,
          directionNav: false,
        });
      },
    };
  }
}());
