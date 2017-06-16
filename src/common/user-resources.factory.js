(function loadUserResourcesFactory() {
  angular
    .module('app.common')
    .factory('userResources', userResources);

  userResources.$inject = ['$resource'];

  function userResources($resource) {
    return {
      UserPreferences: $resource(
          'user/api/user_preferences/:id/', { id: '@id' },
          { update: { method: 'PUT' } }),
    };
  }
}());
