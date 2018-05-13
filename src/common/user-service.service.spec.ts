/* eslint-disable */
describe('app.common', function () {
  beforeEach(angular.mock.module('app.common'));

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
    var userGetter;

    beforeEach(inject(function ($injector) {
      userGetter = $httpBackend.whenGET('auth/api/user');
    }));

    it('logs in completely', inject(function($injector) {
      userGetter.respond({ id: 11, username: 'foo' });
      $httpBackend.expectGET('auth/api/user');
      $httpBackend.whenGET('user/api/user_preferences')
          .respond({ id: 12, user: 11 });
      $httpBackend.whenGET('brewery/api/brewingCompany')
          .respond([{ id: 13 }]);
      $httpBackend.expectGET('user/api/user_preferences');
      $httpBackend.expectGET('brewery/api/brewingCompany');
      const userService = $injector.get('userService');
      $httpBackend.flush();

      expect(userService.loggedIn).toBe(true);
      expect(userService.user.id).toBe(11);
      expect(userService.userPreferences.id).toBe(12);
      expect(userService.brewingCompanies.length).toBe(1);
      expect(userService.brewingCompanies[0].id).toBe(13);
    }));

    it('handles unauthed person', inject(function($injector) {
      userGetter.respond(function() {
        return [401, {}];
      });
      $httpBackend.expectGET('auth/api/user');
      const userService = $injector.get('userService');
      $httpBackend.flush();

      expect(userService.loggedIn).toBe(false);
      expect(userService.user.id).toBeUndefined();
      expect(userService.userPreferences).toBeUndefined();
      expect(userService.brewingCompanies).toBeUndefined();
    }));

    it('errors on other failures', inject(function($injector) {
      userGetter.respond(function() {
        return [500, {}];
      });
      $httpBackend.expectGET('auth/api/user');
      const userService = $injector.get('userService');
      $httpBackend.flush();

      expect(userService.loggedIn).toBe(null);
      expect(userService.user.id).toBeUndefined();
      expect(userService.userPreferences).toBeUndefined();
      expect(userService.brewingCompanies).toBeUndefined();
    }));
  });
});
