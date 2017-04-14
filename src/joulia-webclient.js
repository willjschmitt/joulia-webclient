(function loadJouliaWebserver() {
  angular
    .module('app', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(routeConfig)
    .config(httpConfig)
    .config(resourceConfig);


  routeConfig.$inject = ['$locationProvider', '$routeProvider'];

  function routeConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: 'brewery/html/dashboard.tpl.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard',
      })
      .when('/brewhouse/:brewhouseId', {
        templateUrl: 'brewery/html/brewhouse.tpl.html',
        controller: 'BrewhouseController',
        controllerAs: 'brewhouse',
      })
      .when('/recipes/', {
        templateUrl: 'brewery/html/recipes.tpl.html',
        controller: 'RecipesController',
        controllerAs: 'recipes',
      })
      .when('/recipe/:recipeId', {
        templateUrl: 'brewery/html/recipe.tpl.html',
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
}());
