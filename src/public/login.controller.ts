import angular = require('angular');

angular
  .module('app.public.login', [])
  .controller('LoginController', LoginController);

LoginController.$inject = [];

function LoginController() {}
