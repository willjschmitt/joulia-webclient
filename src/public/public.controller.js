(function loadPublicController() {
  angular
    .module('app.public')
    .controller('PublicController', PublicController);

  PublicController.$inject = [];

  function PublicController() {}
}());
