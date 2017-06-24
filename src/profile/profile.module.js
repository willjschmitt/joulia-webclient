(function loadProfileModule() {
  angular
    .module('app.profile', ['ngRoute', 'app.common', 'ui.bootstrap'])
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/profile/', {
        templateUrl: 'profile/profile.tpl.html',
        controller: 'ProfileController',
        controllerAs: 'profileCtrl',
      });
  }
}());
