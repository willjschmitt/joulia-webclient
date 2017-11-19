(function loadBrewhouseTemperaturePlotsDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseTemperaturePlots', brewhouseTemperaturePlots);

  brewhouseTemperaturePlots.$inject = [
    'TimeSeriesUpdater', 'arrayUtilities', '$interval'];

  function brewhouseTemperaturePlots(
      TimeSeriesUpdater, arrayUtilities, $interval) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipeInstance: '=',
      },
      templateUrl: 'brewhouse/brewhouse-temperature-plots.tpl.html',
      link: function brewhouseTemperaturePlotsController($scope) {
        $scope.boilTemperatureActual = new TimeSeriesUpdater(
            $scope.recipeInstance, 'boil_kettle__temperature', 'value');
        $scope.boilTemperatureSetPoint = new TimeSeriesUpdater(
            $scope.recipeInstance, 'boil_kettle__temperature_set_point',
            'value');
        $scope.mashTemperatureActual = new TimeSeriesUpdater(
            $scope.recipeInstance, 'mash_tun__temperature', 'value');
        $scope.mashTemperatureSetPoint = new TimeSeriesUpdater(
            $scope.recipeInstance, 'mash_tun__temperature_set_point', 'value');

        // Add all the relevant time series to the chart data.
        $scope.dataPoints = [];
        $scope.dataPoints.push({
          key: 'Boil Actual',
          values: $scope.boilTemperatureActual.dataPoints,
        });
        $scope.dataPoints.push({
          key: 'Boil Set Point',
          values: $scope.boilTemperatureSetPoint.dataPoints,
        });
        $scope.dataPoints.push({
          key: 'Mash Actual',
          values: $scope.mashTemperatureActual.dataPoints,
        });
        $scope.dataPoints.push({
          key: 'Mash Set Point',
          values: $scope.mashTemperatureSetPoint.dataPoints,
        });

        // Create and maintain chart.
        $scope.chart = null;
        $scope.chart = nv.models.lineWithFocusChart()
          .x(function xValue(d) { return d[0]; })
          .y(function yValue(d) { return d[1]; })
          .color(d3.scale.category10().range())
          .useInteractiveGuideline(true);
        $scope.chart.xAxis
          .tickFormat(function xAxisFormatter(d) {
            return d3.time.format('%H:%M')(new Date(d));
          });
        $scope.chart.x2Axis
          .tickFormat(function x2AxisFormatter(d) {
            return d3.time.format('%H:%M')(new Date(d));
          });
        $scope.chart.yAxis
          .tickFormat(d3.format(',.1f'));

        function updateChart() {
          d3.select('#chart svg')
            // TODO(will): I shouldnt need to do a deep copy. nvd3 seems to screw
            // around with the references in $scope.dataPoints otherwise and it
            // becomes detached from the service (I think its from a map call that
            // sets to itself).
            .datum(angular.copy($scope.dataPoints))
            .call($scope.chart);

          // TODO(will): Figure out a good way to do this automatically.
          nv.utils.windowResize($scope.chart.update);

          return $scope.chart;
        }
        nv.addGraph(updateChart);
        // Replot every second rather than everytime we get new data so we aren't
        // plotting all the time.
        $interval(updateChart, 10000.0);
      },
    };
  }
}());
