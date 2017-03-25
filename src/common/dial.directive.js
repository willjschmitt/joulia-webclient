angular
  .module('app.common')
  .directive('dial', dial);

dial.$inject = ['$interval'];

function dial($interval) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: '=',
      value: '=',
    },
    templateUrl: 'static/html/angular-directives/dial.html',
    link: function dialController($scope, $element) {
      // Update the pie chart dial color class based on the value.
      // TODO(will): Get duration to work.
      $element.find('.bemat-pie-chart').simplePieChart();

      $interval(updateDial, 500.0);

      /**
       * Updates the value on the pie chart and changes the color class to an
       * appropriate color based on the value
       */
      function updateDial() {
        $element
          .find('.bemat-pie-chart')
            .simplePieChart('set', ($scope.value * 100.0).toPrecision(2));

        // Maps a range to color for the dial.
        const colorClasses = {
          'cc-spc-primary': { min: 0.0, max: 0.0 },
          'cc-spc-success': { min: 0.0, max: 0.5 },
          'cc-spc-info': { min: 0.5, max: 0.75 },
          'cc-spc-warning': { min: 0.75, max: 0.90 },
          'cc-spc-danger': { min: 0.90, max: 1.0 },
        };

        $.each(colorClasses, function checkAndUpdateColor(name, details) {
          $element
            .find('.bemat-pie-chart')
              .removeClass(name);
          if ($scope.value > details.min && $scope.value <= details.max) {
            $element
              .find('.bemat-pie-chart')
                .addClass(name);
          }
        });
      }
    },
  };
}
