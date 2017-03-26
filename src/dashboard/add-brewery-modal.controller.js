(function loadAddBreweryModalController() {
  angular
    .module('app.dashboard')
    .controller('AddBreweryModalController', AddBreweryModalController);

  AddBreweryModalController.$inject = [
    '$uibModalInstance', 'breweryResources'];

  function AddBreweryModalController($uibModalInstance, breweryResources) {
    const vm = this;
    vm.newBrewery = new breweryResources.Brewery();
    vm.brewingCompanys = breweryResources.BrewingCompany.query();
    vm.ok = ok;
    vm.cancel = cancel;

    function ok() {
      vm.newBrewery.$save(close);
    }

    function close() {
      $uibModalInstance.close(true);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
}());
