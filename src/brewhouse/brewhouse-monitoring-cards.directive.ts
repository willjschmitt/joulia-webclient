import angular = require('angular');

import '../templates';
import '../common/user-service.service';
import '../common/value-card.directive';

angular
  .module('app.brewhouse.monitoring-cards',
    [
      'app.templates',
      'app.common.user-service',
      'app.common.value-card',
    ])
  .directive('brewhouseMonitoringCards', brewhouseMonitoringCards);

brewhouseMonitoringCards.$inject = ['userService'];

function brewhouseMonitoringCards(userService) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      recipeInstance: '=',

      // The number of seconds to filter on (negative indicating the past) for
      // requesting historical data.
      historyTime: '=',
    },
    templateUrl: 'brewhouse/brewhouse-monitoring-cards.tpl.html',
    link: function brewhouseMonitoringCardsController($scope) {
      $scope.energyUsageToEnergyCost = energyUsageToEnergyCost;

      /**
       * Uses the user preference for energy cost rate (in $/kWh), and
       * converts an input of energy (in Wh) into $.
       *
       * @param{Number} energyUsage Energy consumed (in Wh).
       * @returns{Number} Cost of the energy consumed (in $).
       */
      function energyUsageToEnergyCost(energyUsage) {
        const kWattHoursPerKilowattHour = 1000.0;
        const energyUsageKWh = energyUsage / kWattHoursPerKilowattHour;
        return energyUsageKWh * userService.userPreferences.energy_cost_rate;
      }
    },
  };
}
