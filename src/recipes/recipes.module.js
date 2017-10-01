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
      .when('/recipes/:recipeId', {
        templateUrl: 'recipes/recipe.tpl.html',
        controller: 'RecipeController',
        controllerAs: 'recipeCtrl',
      })
      .when('/recipeInstance/:recipeInstanceId', {
        templateUrl: 'recipes/recipe-instance-retrospective.controller.tpl.html',
        controller: 'RecipeInstanceRetrospectiveController',
        controllerAs: 'recipeInstanceRetrospectiveCtrl',
      });
  }
}());
