(function loadRecipesModule() {
  angular
    .module('app.recipes', ['ngRoute', 'app.common', 'ui.bootstrap'])
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/recipes/', {
        templateUrl: 'recipes/recipes.tpl.html',
        controller: 'RecipesController',
        controllerAs: 'recipesCtrl',
      })
      .when('/recipe/:recipeId', {
        templateUrl: 'recipes/recipes.tpl.html',
        controller: 'RecipesController',
        controllerAs: 'recipesCtrl',
      });
  }
}());
