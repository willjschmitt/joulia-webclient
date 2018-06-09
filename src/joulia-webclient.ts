import angular = require('angular');
import jQuery = require('jquery');
import 'Modernizr';

import '@uirouter/angularjs';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-perfect-scrollbar';

import './brewhouse/brewhouse.module';
import './dashboard/dashboard.module';
import './profile/profile.module';
import './recipes/recipes.module';

import './common/joulia-header.directive';
import './sidebar/sidebar.directive';

// Polyfills.
jQuery.fn.load = function(callback){ $(window).on("load", callback) };
jQuery.fn.perfectScrollbar = function(){};
jQuery.fn.selectpicker = function(){};
jQuery.fn.tooltip = function(){};

angular
  .module('app', [
    'ui.router',
    'ngResource',
    'ngSanitize',
    'app.dashboard',
    'app.brewhouse',
    'app.recipes',
    'app.profile',
    'perfect_scrollbar',

    'app.common.joulia-header',
    'app.sidebar.sidebar',
  ])
  .service('unauthorizedInterceptor', unauthorizedInterceptor)
  .config(routeConfig)
  .config(httpConfig)
  .config(resourceConfig)
  .run(userConfig);

unauthorizedInterceptor.$inject = ['$q', '$location', '$window'];

function unauthorizedInterceptor($q, $location, $window) {
  const service = this;

  service.responseError = function redirectOn401(response) {
    if (response.status === 401) {
      $window.location.href = getPublicUrl($location);
      return {};
    }
    return $q.reject(response);
  };
}

routeConfig.$inject = ['$locationProvider', '$urlRouterProvider'];

function routeConfig($locationProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('!');
  $urlRouterProvider.otherwise('/dashboard');
}

httpConfig.$inject = ['$httpProvider'];

function httpConfig($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

  $httpProvider.interceptors.push('unauthorizedInterceptor');
}

resourceConfig.$inject = ['$resourceProvider'];

function resourceConfig($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}

userConfig.$inject = ['$rootScope', 'userService', '$location', '$window'];

function userConfig($rootScope, userService, $location, $window) {
  $rootScope.userService = userService;

  // Watch for user change and send them to defaults.
  $rootScope.$watch('userService.user.$resolved', function updateDefaultPath() {
    // Nothing to do if the change of the user is just retrieving it.
    if (!$rootScope.userService.user.$resolved) {
      return;
    }

    // Redirect to public if there is no user.
    if (!$rootScope.userService.user.id) {
      $window.location.href = getPublicUrl($location);
    }
  });
}

function getPublicUrl($location) {
  const rootHost = $location.host().replace('brew.', '');
  return `//${rootHost}`;
}
