import * as _ from 'underscore';

brewhouseInactive.$inject = ['breweryResources'];

export function brewhouseInactive(breweryResources) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      brewhouse: '=',
    },
    templateUrl: 'brewhouse/brewhouse-inactive.tpl.html',
    link: function brewhouseInactiveController($scope) {
      $scope.recipeInstances = breweryResources.RecipeInstance.query({
        brewhouse: $scope.brewhouse.id,
        ordering: '-date',
      });

      $scope.recipes = breweryResources.Recipe.query(
        recipes => indexRecipes(recipes));
      $scope.recipeIndex = {};

      /**
       * Populates the recipeIndex with a mapping of the recipe ID to the
       * recipe object.
       */
      function indexRecipes(recipes) {
        $scope.recipeIndex = {};
        _.each(recipes, function indexRecipe(recipe) {
          $scope.recipeIndex[recipe.id] = recipe;
        });
      }
    },
  };
}
