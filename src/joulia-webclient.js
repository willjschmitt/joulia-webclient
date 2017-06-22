(function loadJouliaWebserver() {
  angular
    .module('app', [
      'ngRoute', 'ngResource', 'ui.bootstrap',
      'app.templates', 'app.dashboard', 'app.brewhouse', 'app.recipes',
      'app.profile', 'perfect_scrollbar',
    ])
    .config(routeConfig)
    .config(httpConfig)
    .config(resourceConfig)
    .run(getUser);


  routeConfig.$inject = ['$locationProvider', '$routeProvider'];

  function routeConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .otherwise('/');
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

  getUser.$inject = ['$rootScope', '$resource'];

  /**
   * Retrieves user from server to check if logged in.
   */
  function getUser($rootScope, $resource) {
    const userResource = $resource('auth/api/user');
    userResource.get(user => userLoggedIn($rootScope, user));
  }

  /**
   * Sets user and welcomes user to Joulia when they arrive logged in.
   */
  function userLoggedIn($rootScope, user) {
    $rootScope.user = user;
    $.toasts('add', { msg: 'Welcome to Joulia!' });
  }
}());
