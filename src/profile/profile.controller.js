(function loadProfileController() {
  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', 'userService'];

  function ProfileController($scope, userService) {
    $scope.user = userService.user;
    $scope.userPreferences = userService.userPreferences;

    $scope.saveUserPreferences = saveUserPreferences;

    /**
     * Saves updated UserPreferences to server.
     */
    function saveUserPreferences() {
      $scope.userPreferences.$update();
    }
  }
}());
