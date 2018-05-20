import angular = require('angular');
import 'angular-resource';

angular
  .module('app.common.user-resources', ['ngResource',])
  .factory('userResources', userResources);

userResources.$inject = ['$resource'];

function userResources($resource) {
  return {
    User: $resource('auth/api/user/'),
    UserPreferences: $resource(
        'user/api/user_preferences/', {}, { update: { method: 'PUT' } }),
  };
}
