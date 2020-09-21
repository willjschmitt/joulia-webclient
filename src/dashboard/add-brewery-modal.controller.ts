import * as angular from 'angular';

import 'angular-ui-bootstrap';

import '../common/brewery-resources.factory';

angular
  .module('app.dashboard.add-brewery-modal',
    [
      'ui.bootstrap',
      'app.common.brewery-resources',
    ])
  .controller('AddBreweryModalController', AddBreweryModalController);

AddBreweryModalController.$inject = [
  '$scope', '$uibModalInstance', 'breweryResources'];

function AddBreweryModalController(
    $scope, $uibModalInstance, breweryResources) {
  $scope.newBrewery = new breweryResources.Brewery();
  $scope.brewingCompanys = breweryResources.BrewingCompany.query();
  $scope.ok = ok;
  $scope.cancel = cancel;

  function ok() {
    $scope.newBrewery.$save(close);
  }

  function close() {
    $uibModalInstance.close($scope.newBrewery);
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
