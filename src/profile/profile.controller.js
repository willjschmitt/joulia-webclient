(function loadProfileController() {
  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', 'userService'];

  function ProfileController($scope, userService) {
    $scope.userService = userService;

    $scope.saveUserPreferences = saveUserPreferences;

    /**
     * Saves updated UserPreferences to server.
     */
    function saveUserPreferences() {
      $scope.userService.userPreferences.$update();
    }
  }
}());
