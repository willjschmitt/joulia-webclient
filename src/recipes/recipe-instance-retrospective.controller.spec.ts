/* eslint-disable */
describe('app.recipes', function () {
  beforeEach(angular.mock.module('app.recipes'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $controller, $httpBackend, $rootScope;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
  }));

  describe('RecipeInstanceRetrospectiveController', function () {
    var recipeInstanceGet;
    var recipeGet;
    var brewhouseGet, breweryGet;

    beforeEach(function () {
      recipeInstanceGet = $httpBackend.whenGET('brewery/api/recipeInstance/3');
      recipeInstanceGet.respond({
        brewhouse: 12,
        recipe: 16,
      });

      recipeGet = $httpBackend.whenGET('brewery/api/recipe/16');
      recipeGet.respond({
        name: "Foo Recipe",
      });

      brewhouseGet = $httpBackend.whenGET('brewery/api/brewhouse/12');
      brewhouseGet.respond({
        id: 12,
        name: '1BBL System',
        brewery: 10,
        active: true,
      });

      breweryGet = $httpBackend.whenGET('brewery/api/brewery/10');
      breweryGet.respond({
        id: 10,
        name: 'Downtown Brewery',
      });
    });

    it('creates the controller', function () {
      const scope = $rootScope.$new();

      $httpBackend.expectGET('brewery/api/recipeInstance/3');
      $httpBackend.expectGET('brewery/api/recipe/16');
      $httpBackend.expectGET('brewery/api/brewhouse/12');
      $httpBackend.expectGET('brewery/api/brewery/10');

      const controller = $controller('RecipeInstanceRetrospectiveController', {
        $scope: scope,
        $stateParams: { recipeInstanceId: 3 },
      });
      $httpBackend.flush();

      expect(controller).toBeDefined();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });
});
