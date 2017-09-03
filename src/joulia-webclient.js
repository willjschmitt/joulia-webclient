(function loadJouliaWebserver() {
  angular
    .module('app', [
      'ngRoute', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'app.common',
      'app.templates', 'app.dashboard', 'app.brewhouse', 'app.recipes',
      'app.profile', 'perfect_scrollbar',
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

  routeConfig.$inject = ['$locationProvider', '$routeProvider'];

  function routeConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise('/');
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
}());
