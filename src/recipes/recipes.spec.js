/* eslint-disable */
describe('app.recipes', function () {
  beforeEach(module('app.recipes'));
  beforeEach(module('joulia.templates'));

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

  describe('RecipesController', function () {
    var controller, scope;
    var recipeQuery, brewhouseQuery;

    beforeEach(inject(function ($injector) {
      recipeQuery = $httpBackend.when('GET', 'brewery/api/recipe')
        .respond([{ id: 0 }, { id: 2 }]);

      brewhouseQuery = $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([{ id: 0 }, { id: 1 }]);

      $httpBackend.expectGET('brewery/api/recipe');
      scope = $rootScope.$new();
      controller = $controller('RecipesController', { $scope: scope });
      $httpBackend.flush();
    }));

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
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