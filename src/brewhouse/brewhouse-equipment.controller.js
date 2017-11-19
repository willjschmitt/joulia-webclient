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

    const states = brewhouseStates.getStates($scope.brewhouse.software_version);

    $scope.hoseStatus = {};
    $scope.$watch('currentStatus.latest', function updateHoseStatus() {
      switch ($scope.currentStatus.latest) {
      case states.statesEnum.statePremash:
      case states.statesEnum.stateStrike:
        $scope.hoseStatus = {
          hltOutToPumpIn: true,
          pumpOutToMashTunIn: true,
        };
        break;
      case states.statesEnum.PostStrike:
      case states.statesEnum.Mash:
      case states.statesEnum.MashoutRamp:
      case states.statesEnum.MashoutRecirculation:
        $scope.hoseStatus = {
          pumpOutToHltExchangerIn: true,
          hltExchangerOutToMashTunIn: true,
          mashTunOutToPumpIn: true,
        };
        break;
      case states.statesEnum.SpargePrep:
      case states.statesEnum.Sparge:
        $scope.hoseStatus = {
          hltOutToPumpIn: true,
          pumpOutToMashTunIn: true,
          mashTunOutToGround: true,
        };
        break;
      case states.statesEnum.PreBoil:
      case states.statesEnum.MashToBoil:
        $scope.hoseStatus = {
          mashTunOutToPumpIn: true,
          pumpOutToHltIn: true,
        };
        break;
      case states.statesEnum.Cool:
        $scope.hoseStatus = {
          waterInToPumpIn: true,
          pumpOutToHltExchangerIn: true,
          hltExchangerOutToGround: true,
        };
        break;
      case states.statesEnum.PumpOut:
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
