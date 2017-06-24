(function loadDashboardModule() {
  angular
    .module('app.dashboard', ['ngRoute', 'app.common', 'ui.bootstrap'])
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'dashboard/dashboard.tpl.html',
        controller: 'DashboardController',
        controllerAs: 'dashboardCtrl',
      });
  }
}());
