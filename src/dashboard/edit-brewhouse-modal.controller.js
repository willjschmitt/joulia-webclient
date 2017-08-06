(function loadEditBrewhouseModalController() {
  angular
    .module('app.dashboard')
    .controller('EditBrewhouseModalController', EditBrewhouseModalController);

  EditBrewhouseModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryResources', 'brewery', 'brewhouse'];

  /**
   * Adds a new, or edits an existing, brewhouse. If adding, brewery must be
   * non-null, and brewhouse must be null. If editing, brewery must be null, and
   * brewhouse must be non-null
   */
  function EditBrewhouseModalController(
      $scope, $uibModalInstance, breweryResources, brewery, brewhouse) {
    if (brewery && brewhouse) {
      throw new Error('Either brewery or brewhouse must be null.');
    }
    if (!brewery && !brewhouse) {
      throw new Error('Either brewery or brewhouse must be non-null.');
    }

    $scope.brewery = brewery;
    $scope.brewhouse = brewhouse || new breweryResources.Brewhouse(
        { brewery: brewery.id });
    $scope.ok = ok;
    $scope.cancel = cancel;

    $scope.tabSelected = {
      boil_kettle: true,
      mash_tun: false,
      main_pump: false,
    };
    $scope.selectTab = selectTab;

    function ok() {
      $scope.brewhouse.$save(close);
    }

    function close() {
      $uibModalInstance.close($scope.brewhouse);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function selectTab(tabToSelect) {
      _.each($scope.tabSelected, function unselectTab(value, key) {
        $scope.tabSelected[key] = false;
      });
      $scope.tabSelected[tabToSelect] = true;
    }
  }
}());
