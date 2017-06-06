/* eslint-disable */
describe('app.recipes', function () {
  beforeEach(module('app.recipes'));
  beforeEach(module('joulia.templates'));

  var $controller, $httpBackend, $rootScope, $compile, $location;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('recipeCard directive', function () {
    var element, scope, controller;
    var recipeQuery, brewhouseQuery;

    beforeEach(inject(function ($injector) {
      recipeQuery = $httpBackend.when('GET', 'brewery/api/recipe')
        .respond([{ id: 0 }, { id: 2 }]);

      brewhouseQuery = $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([{ id: 0 }, { id: 1 }]);
    }));

    beforeEach(function () {
      element = angular.element(
        `<recipe-card
             recipe="recipe">
         </recipe-card>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();
      scope = element.isolateScope() || element.scope();

      scope.recipe = {};
      scope.$digest();
    });

    describe('edit', function () {
      var modalInstance;
      var beerStyleQuery;

      beforeEach(function () {
        beerStyleQuery = $httpBackend.when('GET', 'brewery/api/beerStyle')
          .respond();

        $httpBackend.expectGET('brewery/api/beerStyle');
        modalInstance = scope.edit();
        $httpBackend.flush();
      });

      it('should create a modal', function () {
        expect(modalInstance).toBeDefined();
      });
    });

    describe('launch', function () {
      var modalInstance;
      var launchRecipePost;

      beforeEach(function () {
        launchRecipePost = $httpBackend.when(
            'POST', 'brewery/api/brewhouse/launch/')
          .respond();

        $httpBackend.expectGET('brewery/api/brewhouse');
        modalInstance = scope.launch({id: 0});
        $httpBackend.flush();
      });

      it('should create a modal', function () {
        expect(modalInstance).toBeDefined();
      });

      it('should call performLaunch', function () {
        $httpBackend.expectPOST('brewery/api/brewhouse/launch/');
        modalInstance.close({ brewhouse: { id: 0 } });
        $rootScope.$apply();
        $httpBackend.flush();
      });

      it('calling performLaunch should change the url', function () {
        $httpBackend.expectPOST('brewery/api/brewhouse/launch/');
        modalInstance.close({ brewhouse: { id: 0 } });
        $rootScope.$apply();
        $httpBackend.flush();

        expect($location.url()).toEqual('/brewhouse/0');
      });
    });
  });
});
