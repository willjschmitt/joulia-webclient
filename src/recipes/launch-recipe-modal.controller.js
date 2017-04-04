(function loadLaunchRecipeModalController() {
  angular
    .module('app.recipes')
    .controller('LaunchRecipeModalController', LaunchRecipeModalController);

  LaunchRecipeModalController.$inject = [
    '$uibModalInstance', 'breweryResources'];

  function LaunchRecipeModalController($uibModalInstance, breweryResources) {
    const vm = this;
    vm.brewhouses = breweryResources.Brewhouse.query();
    vm.selectedBrewhouse = null;

    vm.ok = ok;
    vm.cancel = cancel;

    function ok() {
      $uibModalInstance.close({ brewhouse: vm.selectedBrewhouse });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
}());
