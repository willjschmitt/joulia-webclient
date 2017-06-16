(function loadUserServiceService() {
  angular
    .module('app.common')
    .service('userService', userService);

  userService.$inject = ['userResources', 'httpStatus'];

  /**
   * Provides singleton-access to details around the logged in service. This
   * helps us pass around variables related to the user, and make updates to
   * data associated with them, making them available throughout the application
   * immediately.
   *
   * This service and module names the service with "Service" appended to it,
   * sometimes redundantly, to avoid naming collisions, since just "user" would
   * be too common of a name.
   */
  function userService(userResources, httpStatus) {
    const self = this;

    // Internal variables for tracking user data. Should be considered private.
    self.user = userResources.User.get(handleGetUser, handleFailToGetUser);
    self.userPreferences = userResources.UserPreferences.get(
        handleGetUser, handleFailToGetUser);
    self.loggedIn = null;

    /**
     * Sets loggedIn to be false, so we can know we already checked if the user
     * is logged in or not.
     */
    function handleGetUser() {
      self.loggedIn = true;
    }

    /**
     * Sets loggedIn to be false, so we can know we already checked if the user
     * is logged in or not.
     */
    function handleFailToGetUser(response) {
      if (response.status === httpStatus.HTTP_NOT_AUTHENTICATED) {
        self.loggedIn = false;
        return;
      }
      throw new Error('Unexpected failure in getting user: ', response);
    }
  }
}());