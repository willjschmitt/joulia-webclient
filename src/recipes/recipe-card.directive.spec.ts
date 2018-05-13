/* eslint-disable */
describe('app.recipes', function () {
  beforeEach(angular.mock.module('app.recipes'));
  beforeEach(angular.mock.module('joulia.templates'));

  var $controller, $httpBackend, $rootScope, $compile, $location,
      breweryResources;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    breweryResources = $injector.get('breweryResources');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('recipeCard directive', function () {
    var element, scope, controller;

    beforeEach(inject(function ($injector) {
      $httpBackend.when('GET', 'brewery/api/recipe')
        .respond([{ id: 0 }, { id: 2 }]);

      $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([{ id: 0 }, { id: 1 }]);
    }));

    beforeEach(function () {
      element = angular.element(
        `<recipe-card
             recipe="recipe"
             recipes="recipes"
             style="style">
         </recipe-card>`);
      $compile(element)($rootScope.$new());
      $rootScope.$digest();
      scope = element.isolateScope() || element.scope();

      var recipe = new breweryResources.Recipe({ id: 10 });
      scope.recipe = recipe;
      scope.recipes = [recipe];
      scope.style = {};
      scope.$digest();
    });

    describe('template', function () {
      it("contains recipe", function() {
        scope.recipe = { name: 'Foo' };
        scope.$digest();

        expect($(element).find('.recipe-name')[0].innerHTML).toBe('Foo');
      })

      it("contains style", function () {
        scope.style = { name: 'Foo' };
        scope.$digest();

        expect($(element).find('.style-name')[0].innerHTML).toBe('Foo');
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

    describe('remove', function() {
      var deleteRecipe;

      beforeEach(function () {
        deleteRecipe = $httpBackend.whenDELETE(
            'brewery/api/recipe/10').respond();
      });

      it('calls delete on server', function() {
        $httpBackend.expectDELETE('brewery/api/recipe/10');
        scope.remove();
        $httpBackend.flush();
      });

      it('removes the recipe from the array', function() {
        expect(scope.recipes.length).toBe(1);
        $httpBackend.expectDELETE('brewery/api/recipe/10');
        scope.remove();
        $httpBackend.flush();
        expect(scope.recipes.length).toBe(0);
      });
    });
  });
});
