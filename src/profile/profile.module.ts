(function loadProfileModule() {
  angular
    .module('app.profile', ['ui.router', 'app.common', 'ui.bootstrap'])
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
}());
