(function loadAddBrewhouseModalController() {
  angular
    .module('app.dashboard')
    .controller('AddBrewhouseModalController', AddBrewhouseModalController);

  AddBrewhouseModalController.$inject = [
    '$uibModalInstance', 'breweryResources', 'brewery'];

  function AddBrewhouseModalController(
      $uibModalInstance, breweryResources, brewery) {
    const vm = this;
    vm.brewery = brewery;
    vm.newBrewhouse = new breweryResources.Brewhouse({ brewery: brewery.id });
    vm.ok = ok;
    vm.cancel = cancel;

    function ok() {
      vm.newBrewhouse.$save(close);
    }

    function close() {
      $uibModalInstance.close(true);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
}());
