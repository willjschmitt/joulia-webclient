import * as angular from 'angular';
import * as _ from 'underscore';
import 'angular-ui-bootstrap';

import '../templates';
import '../common/brewery-resources.factory';
import '../common/user-service.service';
import './add-brewery-modal.controller';
import './dashboard-brewery.directive';

angular
  .module('app.dashboard.controller',
    [
      'ui.bootstrap',
      'app.templates',
      'app.common.brewery-resources',
      'app.common.user-service',
      'app.dashboard.add-brewery-modal',
      'app.dashboard.brewery',
    ])
  .controller('DashboardController', DashboardController);

DashboardController.$inject = [
  '$scope', 'breweryResources', 'userService', '$uibModal'];

function DashboardController($scope, breweryResources, userService,
    $uibModal) {
  $scope.userService = userService;

  $scope.brewerys = [];
  // Map of brewery.id's to array of brewhouses in them.
  $scope.brewhouses = {};
  $scope.addBrewery = addBrewery;
  updateBrewerys();

  /**
   * Queries the server and updates the brewerys variable with the results.
   * Calls initializeBrewerys when done.
   */
  function updateBrewerys() {
    $scope.brewerys = breweryResources.Brewery.query(initializeBrewerys);
  }

  /**
   * For each of the brewerys, calls getBrewhouses, setting the array of
   * brewhouses on each brewery key in brewhouses.
   */
  function initializeBrewerys() {
    $scope.brewhouses = {};
    _.each($scope.brewerys, brewery => getBrewhouses(brewery));
  }

  /**
   * Sets the array of brewhouse's on the key for brewery.id in brewhouses by
   * querying the server.
   * @param {object} brewery The brewery to query the server for related
   *                         brewhouses.
   */
  function getBrewhouses(brewery) {
    $scope.brewhouses[brewery.id] = breweryResources.Brewhouse.query(
        { brewery: brewery.id });
  }

  /**
   * Launches a modal for user input to add a new brewery to a brewingCompany.
   */
  function addBrewery() {
    const modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'dashboard/add-brewery-modal.tpl.html',
      controller: 'AddBreweryModalController',
    });

    modalInstance.result.then(updateBrewerys);

    return modalInstance;
  }
}
