import angular = require('angular');
import '@uirouter/angularjs';

import './recipe.controller';
import './recipe-instance-retrospective.controller';
import './recipes.controller';

angular
  .module('app.recipes',
    [
      'ui.router',
      'app.recipes.recipe-controller',
      'app.recipes.recipe-instance-retrospective-controller',
      'app.recipes.recipes-controller',
    ])
  .config(stateConfig);

stateConfig.$inject = ['$stateProvider'];

function stateConfig($stateProvider) {
  const recipesState = {
    name: 'recipes',
    url: '/recipes',
    abstract: true,
    template: '<ui-view></ui-view>',
  };
  const recipesListState = {
    name: 'recipes.list',
    url: '',
    templateUrl: 'recipes/recipes.tpl.html',
    controller: 'RecipesController',
    controllerAs: 'recipesCtrl',
  };
  const recipeState = {
    name: 'recipes.recipe',
    url: '/:recipeId',
    templateUrl: 'recipes/recipe.tpl.html',
    controller: 'RecipeController',
    controllerAs: 'recipeCtrl',
  };
  const recipeInstanceState = {
    name: 'recipeInstance',
    url: '/recipeInstance/:recipeInstanceId',
    templateUrl: 'recipes/recipe-instance-retrospective.controller.tpl.html',
    controller: 'RecipeInstanceRetrospectiveController',
    controllerAs: 'recipeInstanceRetrospectiveCtrl',
  };

  $stateProvider.state(recipesState);
  $stateProvider.state(recipesListState);
  $stateProvider.state(recipeState);
  $stateProvider.state(recipeInstanceState);
}
