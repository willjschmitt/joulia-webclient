/* eslint-disable */
describe('app.brewhouse', function () {
  beforeEach(module('app.brewhouse'));
  beforeEach(module('joulia.templates'));

  var $controller, $httpBackend, $rootScope;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
  }));

  describe('BrewhouseController', function () {
    var brewhouseGet, breweryGet, recipeInstanceGet;

    beforeEach(function () {
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

      recipeInstanceGet = $httpBackend.whenGET(
          'brewery/api/recipeInstance?active=true&brewhouse=12');

    })

    it('should be created successfully with no active instance', function () {
      recipeInstanceGet.respond([]);
      const scope = $rootScope.$new();
      // Called by root of controller.
      $httpBackend.expectGET('brewery/api/brewhouse/12');
      // Called by updateBrewery.
      $httpBackend.expectGET('brewery/api/brewery/10');
      // Called by getRecipeInstance.
      $httpBackend.expectGET(
          'brewery/api/recipeInstance?active=true&brewhouse=12');
      const controller = $controller('BrewhouseController', {
        $scope: scope,
        $stateParams: { brewhouseId: 12 },
      });
      $httpBackend.flush();
      expect(controller).toBeDefined();
      expect(scope.recipeInstance).toBeNull();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be throw an error if too many recipe instances are provided',
        function () {
      recipeInstanceGet.respond([{
        id: 13,
        recipe: 1,
        date: moment(),
        brewhouse: 12,
        active: true,
      },
      {
        id: 14,
        recipe: 1,
        date: moment(),
        brewhouse: 12,
        active: true,
      }]);
      const scope = $rootScope.$new();
      const controller = $controller('BrewhouseController', {
        $scope: scope,
        $stateParams: { brewhouseId: 12 },
      });
      expect($httpBackend.flush).toThrow(new Error(
          `Multiple active recipe instance were found for this equipment, which
           should never happen.`));

      // Not checking outstanding requests/expectations, here, since, the
      // expect().toThrow() causes $digest already in progress errors.
    });

    it('handles exactly one recipe instance', function () {
      recipeInstanceGet.respond([{
        id: 13,
        recipe: 1,
        date: moment(),
        brewhouse: 12,
        active: true,
      },]);
      const scope = $rootScope.$new();
      const controller = $controller('BrewhouseController', {
        $scope: scope,
        $stateParams: { brewhouseId: 12 },
      });
      $httpBackend.flush();

      expect(controller).toBeDefined();
      expect(scope.recipeInstance).toBeDefined();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });
});