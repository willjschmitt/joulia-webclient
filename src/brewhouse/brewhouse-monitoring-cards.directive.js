(function loadBrewhouseMonitoringCardsDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseMonitoringCards', brewhouseMonitoringCards);

  brewhouseMonitoringCards.$inject = ['userService'];

  function brewhouseMonitoringCards(userService) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipeInstance: '=',
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
}());
