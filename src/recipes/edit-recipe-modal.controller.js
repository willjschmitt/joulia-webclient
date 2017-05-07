(function loadAddRecipeModalController() {
  angular
    .module('app.recipes')
    .controller('EditRecipeModalController', EditRecipeModalController);

  EditRecipeModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryResources', 'recipe', 'mashPoints',
    'brewingCompany'];

  function EditRecipeModalController(
      $scope, $uibModalInstance, breweryResources, recipe, mashPoints,
      brewingCompany) {
    $scope.recipe = recipe;
    if (!$scope.recipe) {
      $scope.recipe = new breweryResources.Recipe({ company: brewingCompany });
    }
    $scope.mashPoints = mashPoints;
    $scope.beerStyles = breweryResources.BeerStyle.query();
    $scope.ok = ok;
    $scope.cancel = cancel;
    $scope.addMashPoint = addMashPoint;
    $scope.updateMashPoint = updateMashPoint;
    $scope.removeMashPoint = removeMashPoint;
    $scope.promoteMashPoint = promoteMashPoint;
    $scope.demoteMashPoint = demoteMashPoint;

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

    /**
     * Saves and adds new mashPoint to recipe.
     */
    function addMashPoint() {
      const newMashPoint = new breweryResources.MashPoint(
          { recipe: $scope.recipe.id });
      newMashPoint.$save(mashPoint => $scope.mashPoints.push(mashPoint));
    }

    /**
     * Updates provided MashPoint resource.
     */
    function updateMashPoint(mashPoint) {
      mashPoint.$update();
    }

    /**
     * Removes provided MashPoint resource from server and local array.
     */
    function removeMashPoint(mashPoint) {
      const index = $scope.mashPoints.indexOf(mashPoint);
      mashPoint.$delete(() => $scope.mashPoints.splice(index, 1));
    }

    /**
     * Promotes mash point index to make it earlier in process.
     */
    function promoteMashPoint(mashPoint) {
      const index = $scope.mashPoints.indexOf(mashPoint);
      if (index === 0) {
        throw new Error('Cannot promote first mash point.');
      }
      const otherMashPointIdx = index - 1;
      const otherMashPoint = $scope.mashPoints[otherMashPointIdx];
      swapMashPoints(mashPoint, otherMashPoint, index, otherMashPointIdx);
    }

    /**
     * Demotes mash point index to make it earlier in process.
     */
    function demoteMashPoint(mashPoint) {
      const index = $scope.mashPoints.indexOf(mashPoint);
      if (index === $scope.mashPoints.length - 1) {
        throw new Error('Cannot demote last mash point.');
      }
      const otherMashPointIdx = index + 1;
      const otherMashPoint = $scope.mashPoints[otherMashPointIdx];
      swapMashPoints(mashPoint, otherMashPoint, index, otherMashPointIdx);
    }

    /**
     * Swaps the mash point index of the two mash points on the server. Also
     * swaps the position of the mash points in the $scope.mashPoints array.
     *
     * @param{Object} mashPoint1 The first mash point to swap.
     * @param{Object} mashPoint2 The second mash point to swap.
     * @param{Number} index1     The current index of mashPoint1. If undefined,
     *                           the $scope.mashPoints array will be searched.
     * @param{Number} index2     The current index of mashPoint2. If undefined,
     *                           the $scope.mashPoints array will be searched.
     */
    function swapMashPoints(mashPoint1, mashPoint2, index1, index2) {
      // Store the index for the first point, then assign it the second point's
      // index. Give the second point an index higher than any other index
      // temporarily. This is because two points cannot have the same index on
      // the server at a time.
      const highestIdx = $scope.mashPoints[$scope.mashPoints.length - 1].index;
      const mashPoint1Idx = mashPoint1.index;
      mashPoint1.index = mashPoint2.index;
      mashPoint2.index = highestIdx + 1;
      mashPoint2.$update(function saveActualValues() {
        mashPoint1.$update(function saveActualValuePoint2() {
          mashPoint2.index = mashPoint1Idx;
          mashPoint2.$update(function swapPointsInArray() {
            $scope.mashPoints[index2] = mashPoint1;
            $scope.mashPoints[index1] = mashPoint2;
          });
        });
      });
    }
  }
}());
