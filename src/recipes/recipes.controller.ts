import * as angular from 'angular';
import * as _ from 'underscore';
import 'angular-ui-bootstrap';

import '../templates';
import '../common/brewery-resources.factory';
import './recipe-card.directive';

angular
  .module('app.recipes.recipes-controller',
    [
      'ui.bootstrap',
      'app.templates',
      'app.common.brewery-resources',
      'app.recipes.recipe-card',
    ])
  .controller('RecipesController', RecipesController);

RecipesController.$inject = [
  '$scope', '$location', 'breweryResources', '$uibModal'];

export function RecipesController(
    $scope, $location, breweryResources, $uibModal) {
  $scope.recipes = [];
  // Index mapping style id to style object.
  $scope.styleIndex = {};
  updateStyles();
  updateRecipes();
  $scope.addRecipe = addRecipe;

  /**
   * Queries the server for the list of styles.
   */
  function updateStyles() {
    $scope.styleIndex = {};
    breweryResources.BeerStyle.query(
      styles => _.each(styles, function addStyleToIndex(style) {
        $scope.styleIndex[style.id] = style;
      }));
  }

  /**
   * Queries the server for a new list of recipes available.
   */
  function updateRecipes() {
    $scope.recipes = breweryResources.Recipe.query();
  }

  /**
   * Launches modal to ask user for information about adding a new recipe to
   * be able to brew. Reloads recipes after successfully returning from the
   * modal. Will launch pre-modal asking which brewing company to add the
   * recipe to, if the user is a member of more than one brewing company.
   *
   * @returns The created modal instance.
   */
  function addRecipe() {
    // TODO(willjschmitt): This seems like an excessibe query. Consider
    // alternatives with this already being queried in the page route, since
    // it will be a very common piece of data.
    const brewingCompanies = breweryResources.BrewingCompany.query(
      function handleBrewingCompanies() {
        if (brewingCompanies.length === 1) {
          launchAddRecipeModal(brewingCompanies[0].id);
        } else {
          const modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'common/select-brewing-company-modal.tpl.html',
            controller: 'SelectBrewingCompanyController',
          });

          modalInstance.result.then(
            brewingCompany => launchAddRecipeModal(brewingCompany));
        }
      });
  }

  function launchAddRecipeModal(brewingCompany) {
    const recipe = new breweryResources.Recipe({ company: brewingCompany });
    recipe.$save(function navigateToRecipe() {
      $location.url(`recipes/${recipe.id}`);
    });
  }
}
