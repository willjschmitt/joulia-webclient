/* eslint-disable */
describe('app.recipes', function () {
  beforeEach(module('app.recipes'));
  beforeEach(module('joulia.templates'));

  var $controller, $httpBackend, $rootScope, breweryResources;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    breweryResources = $injector.get('breweryResources');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('RecipesController', function () {
    var controller, scope, isolatedScope;
    var recipeQuery, brewhouseQuery, mashPointQuery;

    beforeEach(inject(function ($injector) {
      recipeQuery = $httpBackend.when('GET', 'brewery/api/recipe')
        .respond([{ id: 0 }, { id: 2 }]);

      brewhouseQuery = $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([{ id: 0 }, { id: 1 }]);

      mashPointQuery = $httpBackend.when('GET', 'brewery/api/mash_point')
        .respond([{ id: 0 , recipe: 0 }, { id: 1, recipe: 0 }]);

      $httpBackend.expectGET('brewery/api/recipe');
      $httpBackend.expectGET('brewery/api/mash_point');
      scope = $rootScope.$new();
      controller = $controller('RecipesController', { $scope: scope });
      $httpBackend.flush();
    }));

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    it('should have mapped recipes to mashPoints', function () {
      const want = {
        0: [
          new breweryResources.MashPoint({ id: 0, recipe: 0 }),
          new breweryResources.MashPoint({ id: 1, recipe: 0 }),
        ],
        2: [],
      };
      expect(scope.mashPointsMap).toEqual(want);
    });

    describe('addRecipe', function () {
      var modalInstance;
      var beerStyleQuery;

      beforeEach(function () {
        beerStyleQuery = $httpBackend.when('GET', 'brewery/api/beerStyle')
          .respond();

        $httpBackend.expectGET('brewery/api/beerStyle');
        modalInstance = scope.addRecipe();
        $httpBackend.flush();
      })

      it('should create a modal', function () {
        expect(modalInstance).toBeDefined();
      });

      it('should call updateRecipes', function () {
        $httpBackend.expectGET('brewery/api/recipe');
        modalInstance.close();
        $httpBackend.flush();
      });
    });
  });
});