(function loadBrewhouseTaskListDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseTaskList', brewhouseTaskList);

  brewhouseTaskList.$inject = [];

  function brewhouseTaskList() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'brewhouse/brewhouse-task-list.tpl.html',
      link: function brewhouseTaskListController($scope) {
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
      },
    };
  }
}());
