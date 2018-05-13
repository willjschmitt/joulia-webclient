(function loadBrewhouseModule() {
  angular
    .module('app.brewhouse', [
      'ui.router', 'app.common', 'app.recipes', 'ui.bootstrap'])
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function stateConfig($stateProvider, $urlRouterProvider) {
    const brewhouseState = {
      name: 'brewhouse',
      abstract: true,
      url: '/brewhouse/:brewhouseId',
      templateUrl: 'brewhouse/brewhouse.tpl.html',
      controller: 'BrewhouseController',
      controllerAs: 'brewhouseCtrl',
    };

    const brewhouseAnalysisState = {
      name: 'brewhouse.analysis',
      url: '/analysis',
      templateUrl: 'brewhouse/brewhouse-analysis.tpl.html',
      controller: 'BrewhouseAnalysisController',
      controllerAs: 'brewhouseAnalysisCtrl',
    };

    const brewhouseEquipmentState = {
      name: 'brewhouse.equipment',
      url: '/equipment',
      templateUrl: 'brewhouse/brewhouse-equipment.tpl.html',
      controller: 'BrewhouseEquipmentController',
      controllerAs: 'brewhouseEquipmentCtrl',
    };

    $stateProvider.state(brewhouseState);
    $stateProvider.state(brewhouseAnalysisState);
    $stateProvider.state(brewhouseEquipmentState);

    $urlRouterProvider.when(
      '/brewhouse/:brewhouseId',
      '/brewhouse/:brewhouseId/equipment');
  }
}());
