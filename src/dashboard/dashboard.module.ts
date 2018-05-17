import angular = require('angular');

import '@uirouter/angularjs';
import 'angular-ui-bootstrap';

import '../common/common.module';

import '../templates';

import {AddBreweryModalController} from './add-brewery-modal.controller';
import {DashboardController} from './dashboard.controller';
import {EditBrewhouseModalController} from './edit-brewhouse-modal.controller';

import {dashboardBrewery} from './dashboard-brewery.directive';
import {dashboardBrewhouse} from './dashboard-brewhouse.directive';

angular
  .module('app.dashboard', ['ui.router', 'app.common', 'ui.bootstrap'])
  .config(stateConfig)

  .controller('AddBreweryModalController', AddBreweryModalController)
  .controller('DashboardController', DashboardController)
  .controller('EditBrewhouseModalController', EditBrewhouseModalController)

  .directive('dashboardBrewery', dashboardBrewery)
  .directive('dashboardBrewhouse', dashboardBrewhouse);

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
