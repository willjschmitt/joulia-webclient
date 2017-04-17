(function loadJouliaWebserver() {
  angular
    .module('app', [
      'ngRoute', 'ngResource', 'ui.bootstrap',
      'app.templates', 'app.dashboard', 'app.brewhouse', 'app.recipes',
    ])
    .config(routeConfig)
    .config(httpConfig)
    .config(resourceConfig)
    .run(getUser);


  routeConfig.$inject = ['$locationProvider', '$routeProvider'];

  function routeConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: 'dashboard/dashboard.tpl.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard',
      })
      .when('/brewhouse/:brewhouseId', {
        templateUrl: 'dashboard/brewhouse.tpl.html',
        controller: 'BrewhouseController',
        controllerAs: 'brewhouse',
      })
      .when('/recipes/', {
        templateUrl: 'recipes/recipes.tpl.html',
        controller: 'RecipesController',
        controllerAs: 'recipes',
      })
      .when('/recipe/:recipeId', {
        templateUrl: 'recipes/recipes.tpl.html',
        controller: 'RecipesController',
        controllerAs: 'recipes',
      })
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

  getUser.$inject = ['$rootScope'];

  function getUser() {
    // TODO(willjschmitt): Set user.
  }
}());
