(function loadBrewhouseEquipmentController() {
  angular
    .module('app.brewhouse')
    .controller('BrewhouseEquipmentController', BrewhouseEquipmentController);

  BrewhouseEquipmentController.$inject = [
    '$scope', 'TimeSeriesUpdater', 'brewhouseStates'];

  function BrewhouseEquipmentController(
      $scope, TimeSeriesUpdater, brewhouseStates) {
    $scope.currentStatus = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'state');

    $scope.hoseStatus = {};
    $scope.$watch('currentStatus.latest', function updateHoseStatus() {
      switch ($scope.currentStatus.latest) {
      case brewhouseStates.statesEnum.statePremash:
      case brewhouseStates.statesEnum.stateStrike:
        $scope.hoseStatus = {
          hltOutToPumpIn: true,
          pumpOutToMashTunIn: true,
        };
        break;
      case brewhouseStates.statesEnum.statePostStrike:
      case brewhouseStates.statesEnum.stateMash:
      case brewhouseStates.statesEnum.stateMashoutRamp:
      case brewhouseStates.statesEnum.stateMashoutRecirculation:
        $scope.hoseStatus = {
          pumpOutToHltExchangerIn: true,
          hltExchangerOutToMashTunIn: true,
          mashTunOutToPumpIn: true,
        };
        break;
      case brewhouseStates.statesEnum.stateSpargePrep:
      case brewhouseStates.statesEnum.stateSparge:
        $scope.hoseStatus = {
          hltOutToPumpIn: true,
          pumpOutToMashTunIn: true,
          mashTunOutToGround: true,
        };
        break;
      case brewhouseStates.statesEnum.statePreBoil:
      case brewhouseStates.statesEnum.stateMashToBoil:
        $scope.hoseStatus = {
          mashTunOutToPumpIn: true,
          pumpOutToHltIn: true,
        };
        break;
      case brewhouseStates.statesEnum.stateCool:
        $scope.hoseStatus = {
          waterInToPumpIn: true,
          pumpOutToHltExchangerIn: true,
          hltExchangerOutToGround: true,
        };
        break;
      case brewhouseStates.statesEnum.statePumpOut:
        $scope.hoseStatus = {
          hltOutToGround: true,
        };
        break;
      default:
        $scope.hoseStatus = {};
      }
    });
  }
}());
