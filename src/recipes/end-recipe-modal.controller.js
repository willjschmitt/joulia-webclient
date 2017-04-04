(function loadEndRecipeModalController() {
  angular
    .module('app.recipes')
    .controller('EndRecipeModalController', EndRecipeModalController);

  EndRecipeModalController.$inject = ['$uibModalInstance'];

  function EndRecipeModalController($uibModalInstance) {
    const vm = this;
    vm.ok = ok;
    vm.cancel = cancel;

    function ok() {
      $uibModalInstance.close(true);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
}());
