(function loadBrewhouseOverridesDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseOverrides', brewhouseOverrides);

  brewhouseOverrides.$inject = [];

  function brewhouseOverrides() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'static/brewhouse/brewhouse-overrides.html',
      link: function brewhouseOverridesController($scope) {
        // Overridable statuses - sensor ids for the child elements.
        $scope.heatingElementStatusSensor = 9;
        $scope.heatingElementStatusSensorOverride = 10;

        $scope.pumpStatusSensor = 11;
        $scope.pumpStatusSensorOverride = 12;
      },
    };
  }
}());
