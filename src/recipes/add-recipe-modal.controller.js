(function loadAddRecipeModalController() {
  angular
    .module('app.recipes')
    .controller('AddRecipeModalController', AddRecipeModalController);

  AddRecipeModalController.$inject = ['$uibModalInstance', 'breweryResources'];

  function AddRecipeModalController($uibModalInstance, breweryResources) {
    const vm = this;
    vm.newRecipe = new breweryResources.Recipe();
    vm.beerStyles = breweryResources.BeerStyle.query();
    vm.ok = ok;
    vm.cancel = cancel;

    /**
     * Handles successful "OK" button press for submitting user input.
     */
    function ok() {
      vm.newRecipe.$save(close);
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
  }
}());
