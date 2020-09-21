import * as angular from 'angular';
import * as jQuery from 'jquery';

import '@uirouter/angularjs';
import 'angular-resource';
import 'angular-perfect-scrollbar';

import './public/public.module';

// Polyfills.
(jQuery.fn as any).load = function(callback){ $(window).on("load", callback) };
(jQuery.fn as any).perfectScrollbar = function(){};
(jQuery.fn as any).selectpicker = function(){};
(jQuery.fn as any).tooltip = function(){};

angular
  .module('app', [
    'ui.router',
    'ngResource',
    'app.public',
    'perfect_scrollbar',
  ])
  .config(routeConfig)
  .config(httpConfig)
  .config(resourceConfig);


routeConfig.$inject = ['$locationProvider', '$urlRouterProvider'];

function routeConfig($locationProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('!');
  $urlRouterProvider.otherwise('/');
}

httpConfig.$inject = ['$httpProvider'];

function httpConfig($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}

resourceConfig.$inject = ['$resourceProvider'];

function resourceConfig($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}
