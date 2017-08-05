(function loadAddBrewhouseModalController() {
  angular
    .module('app.dashboard')
    .controller('AddBrewhouseModalController', AddBrewhouseModalController);

  AddBrewhouseModalController.$inject = [
    '$scope', '$uibModalInstance', 'breweryResources', 'brewery'];

  function AddBrewhouseModalController(
      $scope, $uibModalInstance, breweryResources, brewery) {
    $scope.brewery = brewery;
    $scope.newBrewhouse = new breweryResources.Brewhouse(
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
      $scope.newBrewhouse.$save(close);
    }

    function close() {
      $uibModalInstance.close($scope.newBrewhouse);
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
