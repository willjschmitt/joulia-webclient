(function loadRecipesModule() {
  angular
    .module('app.recipes', [
      'ngRoute', 'ngSanitize', 'app.common', 'ui.bootstrap', 'ui.select'])
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
