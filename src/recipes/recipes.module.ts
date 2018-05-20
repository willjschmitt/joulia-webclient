import angular = require('angular');

import '@uirouter/angularjs';
import 'angular-sanitize';
import 'angular-ui-bootstrap';
import 'ui-select';

import '../common/common.module';

import '../templates';

import {recipeCalculations} from './recipe-calculations.service';
import './recipe-instances.service';

import './end-recipe-modal.controller';
import {LaunchRecipeModalController} from './launch-recipe-modal.controller';
import {RecipeController} from './recipe.controller';
import {RecipeInstanceRetrospectiveController} from './recipe-instance-retrospective.controller';
import {RecipesController} from './recipes.controller';

import {ingredientAddition} from './ingredient-addition.directive';
import {ingredientAdditions} from './ingredient-additions.directive';
import {mashProfile} from './mash-profile.directive';
import {recipeCard} from './recipe-card.directive';
import {recipeFermentation} from './recipe-fermentation.directive';
import {recipeProperty} from './recipe-property.directive';

angular
  .module('app.recipes',
    [
      'ui.router', 'ngSanitize', 'app.common', 'ui.bootstrap', 'ui.select',
      'app.recipes.end-recipe-modal',
      'app.recipes.recipe-instances',
    ])
  .config(stateConfig)

  .service('recipeCalculations', recipeCalculations)

  .controller('LaunchRecipeModalController', LaunchRecipeModalController)
  .controller('RecipeController', RecipeController)
  .controller('RecipeInstanceRetrospectiveController',
              RecipeInstanceRetrospectiveController)
  .controller('RecipesController', RecipesController)

  .directive('ingredientAddition', ingredientAddition)
  .directive('ingredientAdditions', ingredientAdditions)
  .directive('mashProfile', mashProfile)
  .directive('recipeCard', recipeCard)
  .directive('recipeFermentation', recipeFermentation)
  .directive('recipeProperty', recipeProperty);

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
