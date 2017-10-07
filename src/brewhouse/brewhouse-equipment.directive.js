(function loadBrewhouseEquipmentDirective() {
  angular
    .module('app.brewhouse')
    .directive('brewhouseEquipment', brewhouseEquipment);

  brewhouseEquipment.$inject = [];

  function brewhouseEquipment() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        recipeInstance: '=',
      },
      templateUrl: 'brewhouse/brewhouse-equipment.tpl.html',
      link: function brewhouseEquipmentController() {},
    };
  }
}());
