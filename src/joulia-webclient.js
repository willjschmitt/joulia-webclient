angular
  .module('joulia-webclient', ['ngRoute','ngResource','ui.bootstrap'])
  .config(routeConfig)
  .config(httpConfig)
  .config(resourceConfig);


routeConfig.$inject = ['$locationProvider', '$routeProvider'];

function routeConfig($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider
    .when('/', {
      templateUrl: 'static/brewery/html/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard',
    })
    .when('/brewhouse/:brewhouseId', {
      templateUrl: 'static/brewery/html/brewhouse.html',
      controller: 'BrewhouseController',
      controllerAs: 'brewhouse',
    })
    .when('/recipes/', {
      templateUrl: 'static/brewery/html/recipes.html',
      controller: 'RecipesController',
      controllerAs: 'recipes'
    })
    .when('/recipe/:recipeId', {
      templateUrl: 'static/brewery/html/recipe.html',
      controller: 'RecipesController',
      controllerAs: 'recipes'
    })
    .otherwise('/');
}

httpConfig.$inject = ['$httpProvider'];

function httpConfig($httpProvider){
  // django and angular both support csrf tokens. This tells
  // angular which cookie to add to what header.
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}

resourceConfig.$inject = ['$resourceProvider'];

function resourceConfig($resourceProvider) {
  	$resourceProvider.defaults.stripTrailingSlashes = false;
}
