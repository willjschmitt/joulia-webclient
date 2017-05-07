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
          brewingCompany: 1,
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
          mashPoints: existingMashPoints,
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

      describe('addMashPoint', function () {
        it('adds new MashPoint', function () {
          $httpBackend.expectPOST('brewery/api/mash_point');
          scope.addMashPoint();
          $httpBackend.flush();
          expect(scope.mashPoints[0]).toBeDefined();
        });
      });

      describe('updateMashPoint', function () {
        it('updates mashPoint', function () {
          $httpBackend.when('PUT', 'brewery/api/mash_point/19')
            .respond(function (method, url, data, headers, params) {
              return [200, data];
            });
          const existingMashPoint = new breweryResources.MashPoint({ id: 19 });
          $httpBackend.expectPUT('brewery/api/mash_point/19');
          scope.updateMashPoint(existingMashPoint);
          $httpBackend.flush();
        });
      });

      describe('removeMashPoint', function () {
        it('removes mashPoint', function () {
          $httpBackend.expectPOST('brewery/api/mash_point');
          $httpBackend.expectPOST('brewery/api/mash_point');
          scope.addMashPoint();
          scope.addMashPoint();
          $httpBackend.flush();
          expect(scope.mashPoints.length).toEqual(2);

          const mashPoint1 = scope.mashPoints[0];
          const mashPoint2 = scope.mashPoints[1];

          $httpBackend.when('DELETE', 'brewery/api/mash_point/' + mashPoint1.id)
            .respond(function (method, url, data, headers, params) {
              return [200, {}];
            });
          $httpBackend.expectDELETE('brewery/api/mash_point/' + mashPoint1.id);
          scope.removeMashPoint(mashPoint1);
          $httpBackend.flush();
          expect(scope.mashPoints.length).toBe(1);
          expect(scope.mashPoints).not.toContain(mashPoint1);
          expect(scope.mashPoints).toContain(mashPoint2);
        });
      });

      describe('promoteMashPoint', function () {
        it('should promote', function () {
          $httpBackend.expectPOST('brewery/api/mash_point');
          $httpBackend.expectPOST('brewery/api/mash_point');
          scope.addMashPoint();
          scope.addMashPoint();
          $httpBackend.flush();
          expect(scope.mashPoints.length).toEqual(2);

          const mashPoint1 = scope.mashPoints[0];
          mashPoint1.index = 0;
          mashPoint1.id = 10;
          const mashPoint2 = scope.mashPoints[1];
          mashPoint2.index = 1;
          mashPoint2.id = 11;

          // TODO(willjschmitt): Make these regexps for the urls. I can't for
          // some silly reason get regexp recognition to work here.
          $httpBackend.when('PUT', 'brewery/api/mash_point/10')
            .respond(function (method, url, data, headers, params) {
              return [200, data];
            });
          $httpBackend.when('PUT', 'brewery/api/mash_point/11')
            .respond(function (method, url, data, headers, params) {
              return [200, data];
            });

          $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint1.id);
          $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint2.id);
          $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint1.id);
          scope.promoteMashPoint(mashPoint2);
          $httpBackend.flush();

          expect(mashPoint1.index).toBe(1);
          expect(mashPoint2.index).toBe(0);
          expect(scope.mashPoints[0].id).toBe(mashPoint2.id);
          expect(scope.mashPoints[1].id).toBe(mashPoint1.id);
        });

        it('should throw error when promoting first point', function () {
          $httpBackend.expectPOST('brewery/api/mash_point');
          scope.addMashPoint();
          $httpBackend.flush();
          expect(scope.mashPoints.length).toEqual(1);
          expect(function(){scope.promoteMashPoint(scope.mashPoints[0]);})
            .toThrow(new Error('Cannot promote first mash point.'));
        });
      });



      describe('demoteMashPoint', function () {
        it('should demote', function () {
          $httpBackend.expectPOST('brewery/api/mash_point');
          $httpBackend.expectPOST('brewery/api/mash_point');
          scope.addMashPoint();
          scope.addMashPoint();
          $httpBackend.flush();
          expect(scope.mashPoints.length).toEqual(2);

          const mashPoint1 = scope.mashPoints[0];
          mashPoint1.index = 0;
          mashPoint1.id = 10;
          const mashPoint2 = scope.mashPoints[1];
          mashPoint2.index = 1;
          mashPoint2.id = 11;

          // TODO(willjschmitt): Make these regexps for the urls. I can't for
          // some silly reason get regexp recognition to work here.
          $httpBackend.when('PUT', 'brewery/api/mash_point/10')
            .respond(function (method, url, data, headers, params) {
              return [200, data];
            });
          $httpBackend.when('PUT', 'brewery/api/mash_point/11')
            .respond(function (method, url, data, headers, params) {
              return [200, data];
            });

          $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint2.id);
          $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint1.id);
          $httpBackend.expectPUT('brewery/api/mash_point/' + mashPoint2.id);
          scope.demoteMashPoint(mashPoint1);
          $httpBackend.flush();

          expect(mashPoint1.index).toBe(1);
          expect(mashPoint2.index).toBe(0);
          expect(scope.mashPoints[0].id).toBe(mashPoint2.id);
          expect(scope.mashPoints[1].id).toBe(mashPoint1.id);
        });
      });

      it('should throw error when demoting last point', function () {
        $httpBackend.expectPOST('brewery/api/mash_point');
        scope.addMashPoint();
        $httpBackend.flush();
        expect(scope.mashPoints.length).toEqual(1);
        expect(function(){scope.demoteMashPoint(scope.mashPoints[0]);})
          .toThrow(new Error('Cannot demote last mash point.'));
      });
    });

    describe('cancel', function () {
      it('should dismiss modal', function () {
        scope = $rootScope.$new();
        controller = $controller('EditRecipeModalController', {
          $scope: scope,
          $uibModalInstance: $uibModalInstance,
          recipe: undefined,
          mashPoints: [],
          brewingCompany: null,
        });
        $httpBackend.flush();
        scope.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
      });
    });
  });
});
