import angular = require('angular');

import '@uirouter/angularjs';
import 'angular-ui-bootstrap';

import '../common/common.module';

import '../templates';

import {ProfileController} from './profile.controller';

angular
  .module('app.profile', ['ui.router', 'app.common', 'ui.bootstrap'])
  .config(stateConfig)

  .controller('ProfileController', ProfileController);

stateConfig.$inject = ['$stateProvider'];

function stateConfig($stateProvider) {
  const profileState = {
    name: 'profile',
    url: '/profile',
    templateUrl: 'profile/profile.tpl.html',
    controller: 'ProfileController',
    controllerAs: 'profileCtrl',
  };

  $stateProvider.state(profileState);
}
