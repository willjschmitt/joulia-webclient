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
      showLoadingElement();
      $scope.userService.userPreferences.$update(
          doneUpdating, hideLoadingElement);
    }

    function doneUpdating() {
      hideLoadingElement();
    }

    /**
     * Retrieves the loading element in this panel.
     */
    function loadingElement() {
      return angular.element('#loading');
    }

    /**
     * Shows the loading icon. That is, starts the icon spinning.
     */
    function showLoadingElement() {
      loadingElement().circularProgress('show');
    }

    /**
     * Hides the loading icon. That is, stops the icon spinning.
     */
    function hideLoadingElement() {
      loadingElement().circularProgress('hide');
    }
  }
}());
