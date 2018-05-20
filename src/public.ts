import angular = require('angular');
import jQuery = require('jquery');
import 'Modernizr';

import '@uirouter/angularjs';
import 'angular-resource';
import 'angular-perfect-scrollbar';

import './public/public.module';

// Polyfills.
jQuery.fn.load = function(callback){ $(window).on("load", callback) };
jQuery.fn.perfectScrollbar = function(){};
jQuery.fn.selectpicker = function(){};
jQuery.fn.tooltip = function(){};

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
