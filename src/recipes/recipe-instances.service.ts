import * as angular from 'angular';

angular
  .module('app.recipes.recipe-instances', [])
  .service('recipeInstances', recipeInstances);

recipeInstances.$inject = ['$http'];

function recipeInstances($http) {
  const self = this;

  self.launch = launch;
  self.end = end;

  /**
   * Launches a recipe instance of a recipe on a brewhouse. Sends a request to
   * start the service and returns a promise for the request.
   *
   * @param{Number} recipeId The primary key for the recipe to launch.
   * @param{Number} brewhouesId The primary key for the brewhouse to launch
   *   the recipe on.
   *
   * @returns The promise for the http request to the server to launch the
   *   recipe instance. Response should include the primary key for the
   *   new recipe instance keyed on "recipe_instance".
   */
  function launch(recipeId, brewhouseId) {
    return $http({
      method: 'POST',
      url: 'brewery/api/brewhouse/launch/',
      data: {
        recipe: recipeId,
        brewhouse: brewhouseId,
      },
    });
  }

  /**
   * Ends a currently active recipe instance. Sends a request to the server to
   * terminate the recipe instance.
   *
   * @param{Number} recipeInstanceId The primary key for the active recipe
   *   instance to terminate.
   *
   * @returns The promise for the http request to the server to end the
   *   recipe instance.
   */
  function end(recipeInstanceId) {
    return $http({
      method: 'POST',
      url: 'brewery/api/brewhouse/end/',
      data: {
        recipe_instance: recipeInstanceId,
      },
    });
  }
}
