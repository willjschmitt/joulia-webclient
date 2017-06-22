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

    $rootScope.$watch('userService.user.id', function updateDefaultPath() {
      if ($rootScope.userService.user.id) {
        $location.url('/dashboard');
      } else {
        $location.url('/');
      }
    });
  }
}());
