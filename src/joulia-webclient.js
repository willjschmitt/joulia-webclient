(function loadJouliaWebserver() {
  angular
    .module('app', [
      'ngRoute', 'ngResource', 'ui.bootstrap', 'app.common', 'app.public',
      'app.templates', 'app.dashboard', 'app.brewhouse', 'app.recipes',
      'app.profile', 'perfect_scrollbar',
    ])
    .config(routeConfig)
    .config(httpConfig)
    .config(resourceConfig)
    .run(userConfig);


  routeConfig.$inject = ['$locationProvider', '$routeProvider'];

  function routeConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise('/');
  }

  httpConfig.$inject = ['$httpProvider'];

  function httpConfig($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  }

  resourceConfig.$inject = ['$resourceProvider'];

  function resourceConfig($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }

  userConfig.$inject = ['$rootScope', 'userService', '$location'];

  function userConfig($rootScope, userService, $location) {
    $rootScope.userService = userService;

    // Watch for user change and send them to defaults.
    $rootScope.$watch('userService.user.id', function updateDefaultPath() {
      if ($rootScope.userService.user.id) {
        $location.url('/dashboard');
      } else {
        $location.url('/');
      }
    });

    const bematCsss = [
      { href: 'static/vendor/bemat-admin/css/bootstrap.css' },
      { href: 'static/vendor/bemat-admin/css/themes/theme-default/bemat-admin.css' },
      { href: 'static/css/joulia.css' },
      { href: 'static/vendor/bemat-admin/vendor/google-code-prettify/prettify-tomorrow.css' },
      { href: 'static/vendor/bemat-admin/vendor/nvd3/nv.d3.css' },
    ];

    const ultimateFlatCsss = [
      { href: 'static/vendor/ultimate-flat/inc/css/bootstrap.min.css' },
      { href: 'static/vendor/ultimate-flat/style.css' },
      { href: 'static/vendor/ultimate-flat/inc/css/green.css' },
      { href: 'static/vendor/ultimate-flat/inc/flexslider/flexslider.css' },
      { href: 'static/vendor/ultimate-flat/inc/owl-carousel/owl.carousel.css' },
      { href: 'static/vendor/ultimate-flat/inc/owl-carousel/owl.theme.css' },
      { href: 'static/vendor/ultimate-flat/inc/magnific-popup/magnific-popup.css' },
    ];

    // Watch for user change and change css based on part of app.
    $rootScope.$watch('userService.user.id', function updateCss() {
      if ($rootScope.userService.user.id) {
        $rootScope.csss = bematCsss;
      } else {
        $rootScope.csss = ultimateFlatCsss;
      }
    });
  }
}());
