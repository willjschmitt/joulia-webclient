(function loadPublicModule() {
  angular
    .module('app.public', ['ngRoute', 'app.common', 'ui.bootstrap'])
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'public/public.tpl.html',
        controller: 'PublicController',
        controllerAs: 'publicCtrl',
      })
      .when('/login', {
        templateUrl: 'public/login.tpl.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl',
      });
  }
}());
