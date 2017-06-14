(function loadRecipesController() {
  angular
    .module('app.recipes')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = ['$scope', 'breweryResources', '$uibModal'];

  function RecipesController(
      $scope, breweryResources, $uibModal) {
    $scope.recipes = [];
    $scope.mashPointsMap = {};
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
      $scope.recipes = breweryResources.Recipe.query(updateMashPoints);
    }

    /**
     * Queries the server for all of the mashpoints. Should be called after
     * recipes are received, so recipes can be mapped to mash points.
     */
    function updateMashPoints() {
      breweryResources.MashPoint
        .query(mashPoints => mapRecipesToMashPoints(mashPoints));
    }

    /**
     * Resets the recipe to mash point map with empty arrays for all recipes,
     * then adds all mashpoints to the array in the map associated with its
     * recipe's primary key.
     */
    function mapRecipesToMashPoints(mashPoints) {
      _.each($scope.recipes, function resetRecipeInMap(recipe) {
        $scope.mashPointsMap[recipe.id] = [];
      });

      _.each(mashPoints, function addMashPointToMap(mashPoint) {
        $scope.mashPointsMap[mashPoint.recipe].push(mashPoint);
      });
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
      recipe.$save();
      const modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'recipes/edit-recipe-modal.tpl.html',
        controller: 'EditRecipeModalController',
        resolve: {
          recipe: function resolveRecipe() { return recipe; },
          mashPoints: function resolveMashPoints() { return []; },
          brewingCompany: function resolveBrewingCompany() {
            return brewingCompany;
          },
        },
      });

      modalInstance.result.then(updateRecipes);

      return modalInstance;
    }
  }
}());
