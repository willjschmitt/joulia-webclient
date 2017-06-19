/* eslint-disable */
describe('app.common', function () {
  beforeEach(module('app.common'));

  var $controller, $httpBackend, $rootScope, $compile, $location;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('userService service', function () {
    var userGetter, userPreferencesGetter;

    beforeEach(inject(function ($injector) {
      userGetter = $httpBackend.whenGET('auth/api/user');

      userPreferencesGetter = $httpBackend.whenGET('user/api/user_preferences');
    }));

    it('logs in completely', inject(function($injector) {
      userGetter.respond({ id: 11, username: 'foo' });
      userPreferencesGetter.respond({ id: 12, user: 11 });
      $httpBackend.expectGET('auth/api/user');
      $httpBackend.expectGET('user/api/user_preferences');
      const userService = $injector.get('userService');
      $httpBackend.flush();

      expect(userService.loggedIn).toBe(true);
      expect(userService.user.id).toBe(11);
      expect(userService.userPreferences.id).toBe(12);
    }));

    it('handles unauthed person', inject(function($injector) {
      userGetter.respond(function() {
        return [401, {}];
      });
      userPreferencesGetter.respond(function() {
        return [401, {}];
      });
      $httpBackend.expectGET('auth/api/user');
      $httpBackend.expectGET('user/api/user_preferences');
      const userService = $injector.get('userService');
      $httpBackend.flush();

      expect(userService.loggedIn).toBe(false);
      expect(userService.user.id).toBeUndefined();
      expect(userService.userPreferences.id).toBeUndefined()
    }));

    it('errors on other failures', inject(function($injector) {
      userGetter.respond(function() {
        return [500, {}];
      });
      userPreferencesGetter.respond(function() {
        return [500, {}];
      });
      $httpBackend.expectGET('auth/api/user');
      $httpBackend.expectGET('user/api/user_preferences');
      const userService = $injector.get('userService');
      $httpBackend.flush();

      expect(userService.loggedIn).toBe(null);
      expect(userService.user.id).toBeUndefined();
      expect(userService.userPreferences.id).toBeUndefined()
    }));
  });
});
