/* eslint-disable */
describe('app.recipes edit-recipe-modal.controller', function () {
  beforeEach(module('app.recipes'));
  beforeEach(module('joulia.templates'));

  var $controller, $httpBackend, $rootScope, $location, breweryResources;

  beforeEach(inject(function ($injector) {
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    breweryResources = $injector.get('breweryResources');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('EditRecipeModalController', function () {
    var controller, scope;
    var beerStyleQuery;
    var maltIngredientQuery, bitteringIngredientQuery;
    var mashPointQuery;
    var maltIngredientAdditionQuery, bitteringIngredientAdditionQuery;
    var $uibModalInstance;

    // Define spy objects for the $uibModalInstance.
    beforeEach(function () {
      $uibModalInstance = jasmine.createSpyObj(
          '$uibModalInstance', ['close', 'dismiss']);
    });

    // Define responses for the non-recipe-specific items (e.g: beer style, and
    // ingredients.
    beforeEach(function () {
      beerStyleQuery = $httpBackend.when('GET', 'brewery/api/beerStyle')
        .respond([
          { id: 0, name: "American IPA" },
          { id: 2, name: "Russian Imperial Stout" }]);

      maltIngredientQuery = $httpBackend.when(
          'GET', 'brewery/api/malt_ingredient')
        .respond([
          { id: 1, name: "US 2-Row" },
          { id: 3, name: "Maris Otter" }]);

      bitteringIngredientQuery = $httpBackend.when(
          'GET', 'brewery/api/bittering_ingredient')
        .respond([
          { id: 1, name: "Mosaic" },
          { id: 3, name: "Galaxy" }]);

      $httpBackend.expectGET('brewery/api/beerStyle');
    });

    // Define responses for queries for foreign items attached to the recipe.
    beforeEach(function () {
      mashPointQuery = $httpBackend.whenGET(
          /brewery\/api\/mash_point\?recipe=\d+/).respond([]);

      maltIngredientAdditionQuery = $httpBackend.when(
          'GET', /brewery\/api\/malt_ingredient_addition\?recipe=\d+/)
        .respond(function(method, url, data, headers, params) {
          if (!params.hasOwnProperty('recipe')) {
            throw new Error("missing recipe in malt_ingredient_addition query");
          }
          return [
            200,
            [
              {
                id: 1,
                recipe: params.recipe,
                ingredient: 1,
                amount: 100.0,
                step_added: breweryResources.BREWING_STEP_CHOICES.MASH.value,
                time_added: 5400,
              },
            ],
          ];
        });

      bitteringIngredientAdditionQuery = $httpBackend.when(
          'GET', /brewery\/api\/bittering_ingredient_addition\?recipe=\d+/)
        .respond(function(method, url, data, headers, params) {
          if (!params.hasOwnProperty('recipe')) {
            throw new Error(
              "missing recipe in bittering_ingredient_addition query");
          }
          return [
            200,
            [
              {
                id: 1,
                recipe: params.recipe,
                ingredient: 1,
                amount: 100.0,
                step_added: breweryResources.BREWING_STEP_CHOICES.BOIL.value,
                time_added: 3600,
              },
            ],
          ];
        });

      $httpBackend.expectGET(/brewery\/api\/mash_point\?recipe=\d+/);
      $httpBackend.expectGET(
          /brewery\/api\/malt_ingredient_addition\?recipe=\d+/);
      $httpBackend.expectGET(
          /brewery\/api\/bittering_ingredient_addition\?recipe=\d+/);
    });

    var recipeUpdate;
    var existingRecipe, existingMashPoints;
    var mashPointSave;

    beforeEach(function () {
      recipeUpdate = $httpBackend.when('PUT', 'brewery/api/recipe/10')
        .respond(function (method, url, data, headers, params) {
          return [201, data];
        });

      mashPointSave = $httpBackend
        .when('POST', 'brewery/api/mash_point')
          .respond(function (method, url, data, headers, params) {
            const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            return [201, angular.extend({ id: id }, data)];
          });

      scope = $rootScope.$new();
      existingRecipe = new breweryResources.Recipe();
      existingRecipe.id = 10;
      existingMashPoints = [];
      controller = $controller('EditRecipeModalController', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        recipe: existingRecipe,
        brewingCompany: null,
      });
      $httpBackend.flush();
    });

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    describe('ok', function () {
      it('should update existing recipe on server and close modal', function () {
        $httpBackend.expectPUT('brewery/api/recipe/10');
        scope.ok();
        $httpBackend.flush();

        expect($uibModalInstance.close).toHaveBeenCalled();
      });
    });

    describe('cancel', function () {
      it('should dismiss modal', function () {
        scope = $rootScope.$new();
        controller = $controller('EditRecipeModalController', {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          recipe: { id: 50 },
          brewingCompany: null,
        });
        $httpBackend.flush();
        scope.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
      });
    });
  });
});
