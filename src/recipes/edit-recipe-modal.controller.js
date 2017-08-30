(function loadAddRecipeModalController() {
  angular
    .module('app.recipes')
    .controller('EditRecipeModalController', EditRecipeModalController);

  EditRecipeModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryResources', 'recipe', 'mashPoints'];

  function EditRecipeModalController(
      $scope, $uibModalInstance, breweryResources, recipe, mashPoints) {
    $scope.recipe = recipe;
    if (!$scope.recipe || !$scope.recipe.id) {
      throw new Error(
          'not supporting creation of recipe in this modal anymore');
      // $scope.recipe = new breweryResources.Recipe({ company: brewingCompany });
    }
    $scope.mashPoints = mashPoints;
    $scope.beerStyles = breweryResources.BeerStyle.query();
    $scope.maltIngredients = breweryResources.MaltIngredient.query();
    $scope.bitteringIngredients = breweryResources.BitteringIngredient.query();
    $scope.maltIngredientAdditions
        = breweryResources.MaltIngredientAddition.query(
            { recipe: $scope.recipe.id });
    $scope.bitteringIngredientAdditions
        = breweryResources.BitteringIngredientAddition.query(
            { recipe: $scope.recipe.id });

    // Makes the resources available to pass into child elements for
    // ingredient-additions.
    $scope.breweryResources = breweryResources;

    $scope.ok = ok;
    $scope.cancel = cancel;
    $scope.tabSelected = {
      recipe_properties: true,
      malt_ingredients: false,
      bittering_ingredients: false,
    };
    $scope.selectTab = selectTab;

    /**
     * Handles successful "OK" button press for submitting user input.
     */
    function ok() {
      if ($scope.recipe.hasOwnProperty('id')) {
        $scope.recipe.$update(close);
      } else {
        $scope.recipe.$save(close);
      }
    }

    /**
     * Closes modal, resolving as successful.
     */
    function close() {
      $uibModalInstance.close(true);
    }

    /**
     * Closes modal, resolving as failure.
     */
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    /* Sets the key `tabToSelect` to true in `$scope.tabSelected`, and sets all
     * other keys to false.
     */
    function selectTab(tabToSelect) {
      _.each($scope.tabSelected, function unselectTab(value, key) {
        $scope.tabSelected[key] = false;
      });
      $scope.tabSelected[tabToSelect] = true;
    }
  }
}());
