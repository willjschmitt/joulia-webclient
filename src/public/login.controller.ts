(function loadJouliaLoginDirective() {
  angular
    .module('app.public')
    .controller('LoginController', LoginController);

  LoginController.$inject = [];

  function LoginController() {}
}());
