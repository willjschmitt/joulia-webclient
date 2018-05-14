userResources.$inject = ['$resource'];

export function userResources($resource) {
  return {
    User: $resource('auth/api/user/'),
    UserPreferences: $resource(
        'user/api/user_preferences/', {}, { update: { method: 'PUT' } }),
  };
}
