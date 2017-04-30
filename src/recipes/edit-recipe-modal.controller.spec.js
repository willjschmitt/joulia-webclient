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
          mashPoints: [],
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
      var existingRecipe, existingMashPoints;

      beforeEach(function () {
        recipeUpdate = $httpBackend.when('PUT', 'brewery/api/recipe/10')
          .respond(function (method, url, data, headers, params) {
            return [201, data];
          });

        scope = $rootScope.$new();
        existingRecipe = new breweryResources.Recipe();
        existingRecipe.id = 10;
        existingMashPoints = [];
        controller = $controller('EditRecipeModalController', {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          recipe: existingRecipe,
          mashPoints: existingMashPoints,
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

      describe('addMashPoint', function () {
        it('adds new MashPoint', function () {
          const mashPointSave = $httpBackend
            .when('POST', 'brewery/api/mash_point')
              .respond(function (method, url, data, headers, params) {
                return [201, angular.extend({ id: 19}, data)];
              });
          $httpBackend.expectPOST('brewery/api/mash_point');
          scope.addMashPoint();
          $httpBackend.flush();
          expect(scope.mashPoints[0].id).toEqual(19);
        });
      });

      describe('updateMashPoint', function () {
        it('updates mashPoint', function () {
          const mashPointSave = $httpBackend
            .when('PUT', 'brewery/api/mash_point/19')
              .respond(function (method, url, data, headers, params) {
                return [201, data];
              });
          const existingMashPoint = new breweryResources.MashPoint({ id: 19 });
          $httpBackend.expectPUT('brewery/api/mash_point/19');
          scope.updateMashPoint(existingMashPoint);
          $httpBackend.flush();
        });
      })
    });

    describe('cancel', function () {
      it('should dismiss modal', function () {
        scope = $rootScope.$new();
        controller = $controller('EditRecipeModalController', {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          recipe: undefined,
          mashPoints: [],
        });
        $httpBackend.flush();
        scope.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
      });
    });
  });
});
