/* eslint-disable */
describe('app.recipes', function () {
  beforeEach(module('app.recipes'));
  beforeEach(module('joulia.templates'));

  var $controller, $httpBackend, $rootScope, $location;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('RecipesController', function () {
    var controller;
    var recipeQuery, brewhouseQuery;

    beforeEach(inject(function ($injector) {
      recipeQuery = $httpBackend.when('GET', 'brewery/api/recipe')
        .respond([{ id: 0 }, { id: 2 }]);

      brewhouseQuery = $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([{ id: 0 }, { id: 1 }]);

      $httpBackend.expectGET('brewery/api/recipe');
      controller = $controller('RecipesController');
      $httpBackend.flush();
    }));

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('launchRecipe', function () {
      var modalInstance;
      var launchRecipePost;

      beforeEach(function () {
        launchRecipePost = $httpBackend.when('POST', 'brewery/brewhouse/launch')
          .respond();

        $httpBackend.expectGET('brewery/api/brewhouse');
        modalInstance = controller.launchRecipe({id: 0});
        $httpBackend.flush();
      });

      it('should create a modal', function () {
        expect(modalInstance).toBeDefined();
      });

      it('should call performLaunch', function () {
        $httpBackend.expectPOST('brewery/brewhouse/launch');
        modalInstance.close({ brewhouse: { id: 0 } });
        $rootScope.$apply();
        $httpBackend.flush();
      });

      it('calling performLaunch should change the url', function () {
        $httpBackend.expectPOST('brewery/brewhouse/launch');
        modalInstance.close({ brewhouse: { id: 0 } });
        $rootScope.$apply();
        $httpBackend.flush();

        expect($location.url()).toEqual('/brewhouse/0');
      });
    });

    describe('addRecipe', function () {
      var modalInstance;
      var beerStyleQuery;

      beforeEach(function () {
        beerStyleQuery = $httpBackend.when('GET', 'brewery/api/beerStyle')
          .respond();

        $httpBackend.expectGET('brewery/api/beerStyle');
        modalInstance = controller.addRecipe();
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