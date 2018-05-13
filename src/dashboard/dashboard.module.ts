(function loadDashboardModule() {
  angular
    .module('app.dashboard', ['ui.router', 'app.common', 'ui.bootstrap'])
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    const dashboardState = {
      name: 'dashboard',
      url: '/dashboard',
      templateUrl: 'dashboard/dashboard.tpl.html',
      controller: 'DashboardController',
      controllerAs: 'dashboardCtrl',
    };

    $stateProvider.state(dashboardState);
  }
}());
