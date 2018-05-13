/* eslint-disable */
describe('app.profile', function () {
  beforeEach(angular.mock.module('app.profile'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $controller, $httpBackend, $rootScope;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('ProfileController', function () {
    var controller, scope, isolatedScope;

    beforeEach(inject(function ($injector) {
      $httpBackend.when('GET', 'auth/api/user')
        .respond({ id: 0, username: 'foo' });

      $httpBackend.when('GET', 'user/api/user_preferences')
        .respond({ id: 0, user: 0, energy_cost_rate: 0.10 });

      $httpBackend.whenGET('brewery/api/brewingCompany').respond([]);

      $httpBackend.when('PUT', 'user/api/user_preferences')
        .respond(function (method, url, data, headers, params) {
          return [200, data];
        });

      $httpBackend.expectGET('auth/api/user');
      $httpBackend.expectGET('user/api/user_preferences');
      $httpBackend.expectGET('brewery/api/brewingCompany');
      scope = $rootScope.$new();
      controller = $controller('ProfileController', { $scope: scope });
      $httpBackend.flush();
    }));

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('saveUserPreferences', function() {
      it('should post update to server', function () {
        $httpBackend.expectPUT('user/api/user_preferences');
        scope.saveUserPreferences();
        $httpBackend.flush();
      });
    });
  });
});