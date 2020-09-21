import * as angular from 'angular';

import '@uirouter/angularjs';
import 'angular-ui-bootstrap';

import './profile.controller';

import '../templates';

angular
  .module('app.profile',
    ['ui.router', 'ui.bootstrap',
     'app.profile.controller',
    ])
  .config(stateConfig);

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
