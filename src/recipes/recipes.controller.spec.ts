/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';

import './recipes.controller';
import '../common/brewery-resources.factory';

describe('app.recipes.recipes-controller', function () {
  beforeEach(angular.mock.module('app.recipes.recipes-controller'));
  beforeEach(angular.mock.module('app.common.brewery-resources'));

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
    var styleQuery, recipeQuery, brewhouseQuery, mashPointQuery;

    beforeEach(inject(function ($injector) {
      styleQuery = $httpBackend.when('GET', 'brewery/api/beerStyle')
        .respond([{ id: 0, name: "Foo" }, { id: 2, name: "Bar" }]);

      recipeQuery = $httpBackend.when('GET', 'brewery/api/recipe')
        .respond([{ id: 0 }, { id: 2 }]);

      brewhouseQuery = $httpBackend.when('GET', 'brewery/api/brewhouse')
        .respond([{ id: 0 }, { id: 1 }]);

      mashPointQuery = $httpBackend.whenGET(
          /brewery\/api\/mash_point\?recipe=\d+/).respond([]);

      $httpBackend.expectGET('brewery/api/recipe');
      scope = $rootScope.$new();
      controller = $controller('RecipesController', { $scope: scope });
      $httpBackend.flush();
    }));

    it('should be created successfully', function () {
      expect(controller).toBeDefined();
    });

    it('should have mapped style ids to styles', function () {
      const want = {
        0: new breweryResources.BeerStyle({ id: 0, name: "Foo" }),
        2: new breweryResources.BeerStyle({ id: 2, name: "Bar" }),
      };
      expect(scope.styleIndex).toEqual(want);
    });

    describe('addRecipe', function () {
      var modalInstance;
      var beerStyleQuery;
      var maltIngredientAdditionQuery, bitteringIngredientAdditionQuery;
      var recipeSave;

      beforeEach(function () {
        recipeSave = $httpBackend.when('POST', 'brewery/api/recipe')
          .respond(function(method, url, data) {
            return [
              200, angular.extend(
                  JSON.parse(data),
                  { id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) }),
            ];
          });
      })

      it('handles 1 brewing company', function () {
        $httpBackend.when('GET', 'brewery/api/brewingCompany')
          .respond([{ id: 0 }]);
        $httpBackend.expectGET('brewery/api/brewingCompany');
        $httpBackend.expectPOST('brewery/api/recipe');
        modalInstance = scope.addRecipe();
        $httpBackend.flush();
      });

      it('handles multiple brewing companies', function () {
        $httpBackend.when('GET', 'brewery/api/brewingCompany')
          .respond([{ id: 0 }]);
        $httpBackend.expectGET('brewery/api/brewingCompany');
        $httpBackend.expectPOST('brewery/api/recipe');
        modalInstance = scope.addRecipe();
        $httpBackend.flush();
      });
    });
  });
});