import * as angular from 'angular';

import '../common/time-series-updater.factory';
import './brewhouse-states.factory';
import './kettle.directive';
import './pump.directive';

angular
  .module('app.brewhouse.equipment',
    [
      'app.common.time-series-updater',
      'app.brewhouse.states',
      'app.brewhouse.kettle',
      'app.brewhouse.pump',
    ])
  .controller('BrewhouseEquipmentController', BrewhouseEquipmentController);

BrewhouseEquipmentController.$inject = [
  '$scope', 'TimeSeriesUpdater', 'brewhouseStates'];

function BrewhouseEquipmentController(
    $scope, TimeSeriesUpdater, brewhouseStates) {
  // TODO(willjschmitt): Make this configurable via url params, etc.
  $scope.historyTime = -60.0 * 15.0;  // 15 Minutes.

  $scope.currentStatus = new TimeSeriesUpdater(
      $scope.recipeInstance.id, 'state', 'value', $scope.historyTime);

  const states = brewhouseStates.getStates($scope.brewhouse.software_version);

  $scope.hoseStatus = {};
  $scope.$watch('currentStatus.latest', function updateHoseStatus() {
    switch ($scope.currentStatus.latest) {
    case states.statesEnum.Prestart:
      $scope.hoseStatus = {};
      break;
    case states.statesEnum.Premash:
      $scope.hoseStatus = {
        hltOutToPumpIn: { connected: true },
        pumpOutToMashTunIn: { connected: true },
      };
      break;
    case states.statesEnum.Strike:
      $scope.hoseStatus = {
        hltOutToPumpIn: { on: true },
        pumpOutToMashTunIn: { on: true },
      };
      break;
    case states.statesEnum.PostStrike:
      $scope.hoseStatus = {
        pumpOutToHltExchangerIn: { connected: true },
        hltExchangerOutToMashTunIn: { connected: true },
        mashTunOutToPumpIn: { connected: true },
      };
      break;
    case states.statesEnum.Mash:
    case states.statesEnum.MashoutRamp:
    case states.statesEnum.MashoutRecirculation:
      $scope.hoseStatus = {
        pumpOutToHltExchangerIn: { on: true },
        hltExchangerOutToMashTunIn: { on: true },
        mashTunOutToPumpIn: { on: true },
      };
      break;
    case states.statesEnum.SpargePrep:
      $scope.hoseStatus = {
        hltOutToPumpIn: { connected: true },
        pumpOutToMashTunIn: { connected: true },
        mashTunOutToGround: { connected: true },
      };
      break;
    case states.statesEnum.Sparge:
      $scope.hoseStatus = {
        hltOutToPumpIn: { on: true },
        pumpOutToMashTunIn: { on: true },
        mashTunOutToGround: { on: true },
      };
      break;
    case states.statesEnum.PreBoil:
      $scope.hoseStatus = {
        mashTunOutToPumpIn: { connected: true },
        pumpOutToHltIn: { connected: true },
      };
      break;
    case states.statesEnum.MashToBoil:
      $scope.hoseStatus = {
        mashTunOutToPumpIn: { on: true },
        pumpOutToHltIn: { on: true },
      };
      break;
    case states.statesEnum.BoilPreheat:
    case states.statesEnum.Boil:
      $scope.hoseStatus = {};
      break;
    case states.statesEnum.Cool:
      $scope.hoseStatus = {
        waterInToPumpIn: { on: true },
        pumpOutToHltExchangerIn: { on: true },
        hltExchangerOutToGround: { on: true },
      };
      break;
    case states.statesEnum.PumpOut:
      $scope.hoseStatus = {
        hltOutToGround: { on: true },
      };
      break;
    case states.statesEnum.Done:
      $scope.hoseStatus = {};
      break;
    default:
      $scope.hoseStatus = {};
    }
  });
}
