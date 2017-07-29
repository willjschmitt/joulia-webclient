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
    $routeProvider.otherwise('/public');
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
    const self = this;

    $rootScope.userService = userService;

    // Watch for user change and send them to defaults.
    $rootScope.$watch('userService.user.$resolved', function updateDefaultPath() {
      // Nothing to do if the change of the user is just retrieving it.
      if (!$rootScope.userService.user.$resolved) {
        return;
      }

      // TODO(willjschmitt): This will always force a user to dashboard or
      // public on the resolution of the user, which happens on the first page
      // load. This is non-ideal, but until I figure a sustainable way to push
      // users to the public pages if they are not logged in or to the dashboard
      // once they log in, we will have to deal with the hassle of not being
      // able to link directly to pages, which is better than not having either
      // at all.

      // Redirect to the base page upon a login status change.
      if ($rootScope.userService.user.id) {
        $location.url('/dashboard');
      } else {
        // If the user is not logged in, definitely redirect them to the index,
        // regardless if we had checked them before or not.
        // TODO(#87): This only works as a workaround while there is only one
        // public page. Need to figure out a long-term solution when more are
        // introduced.
        $location.url('/public');
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
      { href: 'static/bower_components/flexslider/flexslider.css' },
      { href: 'static/bower_components/owl.carousel/dist/assets/owl.carousel.css' },
      { href: 'static/bower_components/owl.carousel/dist/assets/owl.theme.default.css' },
      { href: 'static/vendor/ultimate-flat/inc/magnific-popup/magnific-popup.css' },
    ];

    // Watch for user change and change css based on part of app.
    $rootScope.$watch('userService.user.$resolved', function updateCss() {
      if ($rootScope.userService.user.id) {
        $rootScope.csss = bematCsss;
      } else {
        $rootScope.csss = ultimateFlatCsss;
      }
    });
  }
}());
