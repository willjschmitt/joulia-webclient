import angular = require('angular');

import '../templates';

import './login.controller';
import './public.controller';

angular
  .module('app.public',
    [
      'ui.router',
      'app.templates',
      'app.public.login',
      'app.public.controller',
    ])
  .config(stateConfig);

stateConfig.$inject = ['$stateProvider'];

function stateConfig($stateProvider) {
  const landingState = {
    name: 'landing',
    url: '/',
    templateUrl: 'public/public.tpl.html',
    controller: 'PublicController',
    controllerAs: 'publicCtrl',
  };
  const loginState = {
    name: 'login',
    url: '/login',
    templateUrl: 'public/login.tpl.html',
    controller: 'LoginController',
    controllerAs: 'loginCtrl',
  };

  $stateProvider.state(landingState);
  $stateProvider.state(loginState);
}
