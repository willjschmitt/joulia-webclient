import angular = require('angular');
import '@uirouter/angularjs';

import './brewhouse.controller';
import './brewhouse-analysis.controller';
import './brewhouse-equipment.controller';

angular
  .module('app.brewhouse',
    [
      'ui.router',
      'app.brewhouse.analysis',
      'app.brewhouse.controller',
      'app.brewhouse.equipment',
    ])
  .config(stateConfig);

stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function stateConfig($stateProvider, $urlRouterProvider) {
  const brewhouseState = {
    name: 'brewhouse',
    abstract: true,
    url: '/brewhouse/:brewhouseId',
    templateUrl: 'brewhouse/brewhouse.tpl.html',
    controller: 'BrewhouseController',
    controllerAs: 'brewhouseCtrl',
  };

  const brewhouseAnalysisState = {
    name: 'brewhouse.analysis',
    url: '/analysis',
    templateUrl: 'brewhouse/brewhouse-analysis.tpl.html',
    controller: 'BrewhouseAnalysisController',
    controllerAs: 'brewhouseAnalysisCtrl',
  };

  const brewhouseEquipmentState = {
    name: 'brewhouse.equipment',
    url: '/equipment',
    templateUrl: 'brewhouse/brewhouse-equipment.tpl.html',
    controller: 'BrewhouseEquipmentController',
    controllerAs: 'brewhouseEquipmentCtrl',
  };

  $stateProvider.state(brewhouseState);
  $stateProvider.state(brewhouseAnalysisState);
  $stateProvider.state(brewhouseEquipmentState);

  $urlRouterProvider.when(
    '/brewhouse/:brewhouseId',
    '/brewhouse/:brewhouseId/equipment');
}
