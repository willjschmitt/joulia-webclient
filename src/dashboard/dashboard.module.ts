import * as angular from 'angular';
import '@uirouter/angularjs';

import './dashboard.controller';

angular
  .module('app.dashboard',
    [
      'ui.router',
      'app.dashboard.controller',
    ])
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
