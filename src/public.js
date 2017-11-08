(function loadJouliaWebserver() {
  angular
    .module('app', [
      'ui.router', 'ngResource', 'ui.bootstrap', 'app.common', 'app.public',
      'app.templates', 'perfect_scrollbar',
    ])
    .config(routeConfig)
    .config(httpConfig)
    .config(resourceConfig);


  routeConfig.$inject = ['$locationProvider', '$urlRouterProvider'];

  function routeConfig($locationProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
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
}());
