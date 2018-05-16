import angular = require('angular');

import '@uirouter/angularjs';
import 'angular-ui-bootstrap';

import '../common/common.module';
import '../recipes/recipes.module';

import {BrewhouseController} from './brewhouse.controller';
import {BrewhouseAnalysisController} from './brewhouse-analysis.controller';
import {BrewhouseEquipmentController} from './brewhouse-equipment.controller';

import {brewhouseDials} from './brewhouse-dials.directive';
import {brewhouseEmergencyStop} from './brewhouse-emergency-stop.directive';
import {brewhouseEquipmentMeasurement} from './brewhouse-equipment-measurement.directive';
import {brewhouseInactive} from './brewhouse-inactive.directive';
import {brewhouseMeasurements} from './brewhouse-measurements.directive';
import {brewhouseMonitoringCards} from './brewhouse-monitoring-cards.directive';
import {brewhouseOverrides} from './brewhouse-overrides.directive';
import {brewhouseStates} from './brewhouse-states.factory';
import {brewhouseStatus} from './brewhouse-status.directive';
import {brewhouseTaskList} from './brewhouse-task-list.directive';
import {brewhouseTemperaturePlots} from './brewhouse-temperature-plots.directive';
import {brewhouseTerminator} from './brewhouse-terminator.directive';
import {pump} from './pump.directive';
import {kettle} from './kettle.directive';

angular
  .module('app.brewhouse', [
    'ui.router', 'app.common', 'app.recipes', 'ui.bootstrap'])
  .config(stateConfig)

  .controller('BrewhouseController', BrewhouseController)
  .controller('BrewhouseAnalysisController', BrewhouseAnalysisController)
  .controller('BrewhouseEquipmentController', BrewhouseEquipmentController)

  .factory('brewhouseStates', brewhouseStates)

  .directive('brewhouseDials', brewhouseDials)
  .directive('brewhouseEmergencyStop', brewhouseEmergencyStop)
  .directive('brewhouseEquipmentMeasurement', brewhouseEquipmentMeasurement)
  .directive('brewhouseInactive', brewhouseInactive)
  .directive('brewhouseMeasurements', brewhouseMeasurements)
  .directive('brewhouseMonitoringCards', brewhouseMonitoringCards)
  .directive('brewhouseOverrides', brewhouseOverrides)
  .directive('brewhouseStatus', brewhouseStatus)
  .directive('brewhouseTaskList', brewhouseTaskList)
  .directive('brewhouseTemperaturePlots', brewhouseTemperaturePlots)
  .directive('brewhouseTerminator', brewhouseTerminator)
  .directive('kettle', kettle)
  .directive('pump', pump);

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
