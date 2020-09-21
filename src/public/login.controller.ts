import * as angular from 'angular';

angular
  .module('app.public.login', [])
  .controller('LoginController', LoginController);

LoginController.$inject = [];

function LoginController() {}
