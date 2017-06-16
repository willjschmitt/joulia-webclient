(function loadUserResourcesFactory() {
  angular
    .module('app.common')
    .factory('userResources', userResources);

  userResources.$inject = ['$resource'];

  function userResources($resource) {
    return {
      User: $resource('auth/api/user/'),
      UserPreferences: $resource(
          'user/api/user_preferences/', {}, { update: { method: 'PUT' } }),
    };
  }
}());
