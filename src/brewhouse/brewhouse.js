(function loadBrewhouseController() {
  angular
    .module('app.brewhouse', [])
    .controller('BrewhouseController', BrewhouseController);

  BrewhouseController.$inject = [
    '$scope', '$timeout', '$interval', 'TimeSeriesUpdater', 'breweryApi',
    '$routeParams', '$uibModal', '$http'];

  function BrewhouseController(
      $scope, $timeout, $interval, TimeSeriesUpdater, breweryApi, $routeParams,
      $uibModal, $http) {
    $scope.brewhouse = breweryApi.Brewhouse.get({ id: $routeParams.brewhouseId },
        function updateBrewery() {
          $scope.brewery = breweryApi.Brewery.get({
            id: $scope.brewhouse.brewery,
          });
          getRecipeInstance();
        });

    $scope.endSession = endSession;
    $scope.adjustState = adjustState;

    function getRecipeInstance() {
      breweryApi.recipeInstance.query({
        brewhouse: $scope.brewhouse.id,
        active: 'True',
      }, function loadRecipeInstance(result) {
        if (result.length === 1) {
          $scope.recipeInstance = result[0];
        } else {
          $scope.recipeInstance = null;
        }
      }, function unsetrecipeInstance() {
        $scope.recipeInstance = null;
      });
    }

    function endSession() {
      const modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'static/brewery/html/end-recipe-modal.html',
        controller: 'endRecipeModalController',
      });

      modalInstance.result.then(function endRecipeInstanceOnServer() {
        $http({
          method: 'POST',
          url: '/brewery/brewhouse/end',
          data: {
            recipe_instance: $scope.recipeInstance.id,
          },
        }).then(function unsetrecipeInstance() {
          $scope.recipeInstance = null;
        });
      });
    }

    // Subscribe to all the time series.
    $scope.boilTemperatureActual = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'boil_kettle__temperature');
    $scope.boilTemperatureSetPoint = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'boil_kettle__temperature_set_point');
    $scope.mashTemperatureActual = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'mash_tun__temperature');
    $scope.mashTemperatureSetPoint = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'mash_tun__temperature_set_point');
    $scope.boilKettleDutyCycle = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'boil_kettle__duty_cycle');
    $scope.boilKettlePower = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'boil_kettle__power');
    $scope.systemEnergy = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'system_energy');
    $scope.systemEnergyCost = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'system_energy_cost');
    $scope.currentStatus = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'state', updateStatusText);
    $scope.timer = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'timer');
    $scope.requestPermission = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'request_permission');
    $scope.grantPermission = new TimeSeriesUpdater(
        $scope.recipeInstance.id, 'grant_permission');

    const statuses = [
      'System is currently offline.',
      'Heating water for strike.',
      'Pumping water to mash tun for strike.',
      'Stabilizing hot liquor tun water temperature.',
      'Mashing grain.',
      'Raising hot liquor tun to 170&deg;F for mashout.',
      'Mashout. Recirculating at 170&deg;F.',
      'Preparing for sparge. Waiting for reconfiguration. Ensure output of HLT is configured to pump to Mash Tun.',
      'Sparging. Pumping hot liquor into mash tun.',
      'Preparing for boil. Waiting for reconfiguration. Ensure sparged liquid is configured to pump into boil kettle and boil kettle is empty.',
      'Preheating boil. Raising temperature to boil temperature.',
      'Cooling boil kettle. Make sure the cooling setup is in place.',
      'Pumping cooled wort into fermeneter.',
    ];

    function updateStatusText() {
      $scope.currentStatusText = statuses[$scope.currentStatus.latest];
      $scope.nextStatusText = statuses[$scope.currentStatus.latest + 1];
    }

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

    function adjustState(amount) {
      if ($scope.requestPermission.latest && amount === +1) {
        $scope.grantPermission.set(true);
      } else {
        $scope.currentStatus.set($scope.currentStatus.latest + amount);
      }
    }

    // Watch for permission request.
    $scope.nextStateColor = 'btn-success';
    function updateStateColor() {
      if ($scope.requestPermission.latest) {
        if ($scope.nextStateColor === 'btn-success') {
          $scope.nextStateColor = 'btn-danger';
        } else {
          $scope.nextStateColor = 'btn-success';
        }
      } else {
        $scope.nextStateColor = 'btn-success';
      }
    }
    $interval(updateStateColor, 500);

    // Overridable statuses - sensor ids for the child elements.
    $scope.heatingElementStatusSensor = 9;
    $scope.heatingElementStatusSensorOverride = 10;

    $scope.pumpStatusSensor = 11;
    $scope.pumpStatusSensorOverride = 12;


    // List of tasks to be displayed in the task list.
    $scope.tasks = [
      { name: 'Sanitizing Soak' },
      { name: 'Hot Sanitizing Recirculation' },
      { name: 'Run Brew Cycle' },
      { name: 'Measure Post-Mash Gravity' },
      { name: 'Clean Mash Tun' },
      { name: 'Sanitize Fermenters' },
      { name: 'Measure Post-Boil Gravity' },
      { name: 'Rack to Fermenters' },
      { name: 'Clean Boil Kettle and Chiller' },
    ];

    $.toasts('add', { msg: 'Welcome to Joulia!' });

    // Create and maintain chart.
    $scope.chart = null;
    $scope.chart = nv.models.lineChart()
      .x(function xValue(d) { return d[0]; })
      .y(function yValue(d) { return d[1]; })
      .color(d3.scale.category10().range())
      .useInteractiveGuideline(true);
    $scope.chart.xAxis
      .tickFormat(function xAxisFormatter(d) {
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

      // Clculate min/max in current dataset.
      // TODO(will): I don't know why nvd3 messes up sometimes, but we had to
      // force calculate this.
      let min = _.reduce($scope.dataPoints, minInArrays, Infinity);

      function minInArrays(currentMin, dataPointArray) {
        const minDataPointArray = _.reduce(
            dataPointArray.values, minInArray, Infinity);
        return Math.min(minDataPointArray, currentMin);
      }

      function minInArray(currentMin, dataPoint) {
        return Math.min(dataPoint[1], currentMin);
      }

      let max = _.reduce($scope.dataPoints, maxInArrays, -Infinity);

      function maxInArrays(currentMax, dataPointArray) {
        const maxDataPointArray = _.reduce(
            dataPointArray.values, maxInArray, Infinity);
        return Math.max(maxDataPointArray, currentMax);
      }

      function maxInArray(currentMax, dataPoint) {
        return Math.max(dataPoint[1], currentMax);
      }

      // Make sure we have a spread.
      const minSpread = 10.0;
      if ((max - min) < minSpread) {
        const spreadAdjust = (minSpread - (max - min)) * 0.5;
        max += spreadAdjust;
        min -= spreadAdjust;
      }
      // Update min/max.
      $scope.chart.forceY([min, max]);

      return $scope.chart;
    }
    nv.addGraph(updateChart);
    // Replot every second rather than everytime we get new data so we aren't
    // plotting all the time.
    $interval(updateChart, 5000.0);
  }
}());
