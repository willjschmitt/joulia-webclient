import angular = require('angular');

import {PublicController} from './public.controller';

import {publicAbout} from './public-about.directive';
import {publicFeatures} from './public-features.directive';
import {publicHeader} from './public-header.directive';
import {publicJoin} from './public-join.directive';
import {publicMobile} from './public-mobile.directive';
import {publicScreenshots} from './public-screenshots.directive';
import {publicSidebar} from './public-sidebar.directive';

import '../common/common.module';
import '../templates';

angular
  .module('app.public', ['ui.router', 'app.common', 'ui.bootstrap', 'app.templates'])
  .config(stateConfig)

  .controller('PublicController', PublicController)

  .directive('publicAbout', publicAbout)
  .directive('publicFeatures', publicFeatures)
  .directive('publicHeader', publicHeader)
  .directive('publicJoin', publicJoin)
  .directive('publicMobile', publicMobile)
  .directive('publicScreenshots', publicScreenshots)
  .directive('publicSidebar', publicSidebar);

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
