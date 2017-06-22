(function loadBrewhouseModule() {
  angular
    .module('app.brewhouse', [
      'ngRoute', 'app.common', 'app.recipes', 'ui.bootstrap'])
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/brewhouse/:brewhouseId', {
        templateUrl: 'brewhouse/brewhouse.tpl.html',
        controller: 'BrewhouseController',
        controllerAs: 'brewhouseCtrl',
      });
  }
}());
