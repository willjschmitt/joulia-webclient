(function loadKettleDirective() {
  angular
    .module('app.brewhouse')
    .directive('kettle', kettle);

  kettle.$inject = ['TimeSeriesUpdater'];

  function kettle(TimeSeriesUpdater) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        // The human readable name for the kettle, which will be displayed as a
        // title element.
        label: '=',

        // The computer name for the equipment, which will be prepended to the
        // sensor names for monitoring values. For example, providing
        // 'boil_kettle' will query for things like 'boil_kettle__temperature'.
        name: '=',

        // Boolean if the kettle is heated with a heating element, which will
        // display the power and status of the heating element.
        hasHeatingElement: '=',

        // Boolean if the kettle has a heat exchanger built in, like a hot
        // liquor tun. Might be changed from false to true when a discrete coil
        // is added like during cooling.
        hasHeatExchanger: '=',

        // The recipe instance object, which has the id for the active recipe
        // instance, which will be queried against for the measurement data.
        recipeInstance: '=',
      },
      templateUrl: 'brewhouse/kettle.tpl.html',
      link: function kettleController($scope) {
        if ($scope.hasHeatingElement) {
          $scope.heatingElementStatus = new TimeSeriesUpdater(
            $scope.recipeInstance.id, `${$scope.name}__elementStatus`, 'value');
        }
      },
    };
  }
}());
