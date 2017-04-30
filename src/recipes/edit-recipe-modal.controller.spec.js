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
    var $uibModalInstance;

    beforeEach(function () {
      $uibModalInstance = jasmine.createSpyObj(
          '$uibModalInstance', ['close', 'dismiss']);

      beerStyleQuery = $httpBackend.when('GET', 'brewery/api/beerStyle')
        .respond([
          { id: 0, name: "American IPA" },
          { id: 2, name: "Russian Imperial Stout" }]);

      $httpBackend.expectGET('brewery/api/beerStyle');
    });

    describe('adding new recipe', function () {
      var recipeSave;

      beforeEach(function () {
        recipeSave = $httpBackend.when('POST', 'brewery/api/recipe')
          .respond(function (method, url, data, headers, params) {
            const id = Math.floor(Math.random());
            return [201, angular.extend({ id: id }, data)];
          });

        scope = $rootScope.$new();
        controller = $controller('EditRecipeModalController', {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          recipe: undefined,
        });
        $httpBackend.flush();
      });

      it('should be created successfully', function () {
        expect(controller).toBeDefined();
      });

      describe('ok', function () {
        it('should save new recipe on server and close modal', function () {
          $httpBackend.expectPOST('brewery/api/recipe');
          scope.ok();
          $httpBackend.flush();

          expect($uibModalInstance.close).toHaveBeenCalled();
        });
      });
    });

    describe('editing existing recipe', function () {
      var recipeUpdate;
      var existingRecipe;

      beforeEach(function () {
        recipeUpdate = $httpBackend.when('PUT', 'brewery/api/recipe/10')
          .respond(function (method, url, data, headers, params) {
            return [201, data];
          });

        scope = $rootScope.$new();
        existingRecipe = new breweryResources.Recipe();
        existingRecipe.id = 10;
        controller = $controller('EditRecipeModalController', {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          recipe: existingRecipe,
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
    });

    describe('cancel', function () {
      it('should dismiss modal', function () {
        scope = $rootScope.$new();
        controller = $controller('EditRecipeModalController', {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          recipe: undefined,
        });
        $httpBackend.flush();
        scope.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
      });
    });
  });
});
