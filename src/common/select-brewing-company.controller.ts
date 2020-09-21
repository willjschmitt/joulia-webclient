import * as angular from 'angular';

import 'angular-ui-bootstrap';

import './brewery-resources.factory';

angular
  .module('app.common.select-brewing-company',
    ['app.common.brewery-resources', 'ui.bootstrap'])
  .controller('SelectBrewingCompanyController', SelectBrewingCompanyController);

SelectBrewingCompanyController.$inject = [
  '$scope', '$uibModalInstance', 'breweryResources'];

function SelectBrewingCompanyController(
    $scope, $uibModalInstance, breweryResources) {
  $scope.brewingCompanys = breweryResources.BrewingCompany.query();
  $scope.ok = ok;
  $scope.cancel = cancel;

  $scope.selectedCompany = null;

  function ok() {
    close();
  }

  function close() {
    $uibModalInstance.close($scope.selectedCompany);
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
