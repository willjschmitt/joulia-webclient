/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';
import {Promise} from 'es6-promise'

import './ingredient-additions.directive';
import '../common/brewery-resources.factory';

describe('app.recipes.ingredient.additions', function () {
  beforeEach(angular.mock.module('app.recipes.ingredient-additions'));
  beforeEach(angular.mock.module('app.common.brewery-resources'));

  var $compile, $httpBackend, $rootScope, breweryResources;

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    breweryResources = $injector.get('breweryResources');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('ingredient-additions directive', function () {
    var element, scope, isolatedScope;
    var addition;
    var ingredientSearch;
    var additionQuery, additionAdd, additionUpdate, additionDelete;
    const html = `
        <ingredient-additions
            title="title"
            recipe="recipe"
            ingredient-resource="searchResource"
            ingredient-html="ingredientHTML"
            resource="resource"
            default-step="defaultStep"
            on-change="onChange()">
        </ingredient-additions>`;

    const ingredientId = 1;
    const additionId = 3;
    const recipeId = 11;

    beforeEach(function () {
      ingredientSearch = $httpBackend
        .when('GET', /brewery\/api\/malt_ingredient\?id=\d+/)
        .respond(function(method, url, data, headers, params) {
          return [200, [{ id: ingredientId }]];
        });

      addition = new breweryResources.MaltIngredientAddition({
          id: additionId,
          ingredient: ingredientId,
          amount: 100.0,
          step_added: breweryResources.BREWING_STEP_CHOICES.MASH.value,
          time_added: 5400,
        });

      additionQuery = $httpBackend
        .when('GET', /brewery\/api\/malt_ingredient_addition\?recipe=\d+/)
        .respond(function(method, url, data, headers, params) {
          if (!params.hasOwnProperty('recipe')) {
            throw new Error("missing recipe in malt_ingredient_addition query");
          }
          addition.recipe = params.recipe;
          return [200, [addition]];
        });
      additionAdd = $httpBackend
        .when('POST', /brewery\/api\/malt_ingredient_addition/)
          .respond(function (method, url, data, headers, params) {
            //console.log('hi');
            return [200, data];
          });
      additionUpdate = $httpBackend
        .when('PUT', /brewery\/api\/malt_ingredient_addition\/\d+/)
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });
      additionDelete = $httpBackend
        .when('DELETE', /brewery\/api\/malt_ingredient_addition\/\d+/)
          .respond({});
    });

    beforeEach(function () {
      scope = $rootScope.$new();
      scope.recipe = new breweryResources.Recipe({ id: recipeId });
      scope.searchResource = breweryResources.MaltIngredientSearch;
      scope.resource = breweryResources.MaltIngredientAddition;
      scope.defaultStep = breweryResources.BREWING_STEP_CHOICES.MASH;
      scope.onChange = function () {
        return new Promise((resolve, reject) => resolve());
      };
      spyOn(scope, 'onChange').and.callThrough();
      element = $compile(html)(scope);

      $httpBackend.expectGET(/brewery\/api\/malt_ingredient\?id=\d+/);
      scope.$digest();
      $httpBackend.flush();
      isolatedScope = element.isolateScope();
    });

    describe('addIngredientAddition', function() {
      it('calls add endpoint', function() {
        $httpBackend.expectPOST('brewery/api/malt_ingredient_addition');
        expect(isolatedScope.ingredientAdditions.length).toEqual(1);
        isolatedScope.addIngredientAddition();
        $httpBackend.flush();
        expect(isolatedScope.ingredientAdditions.length).toEqual(2);
        expect(scope.onChange).toHaveBeenCalled();
      });
    });

    describe('updateIngredientAddition', function() {
      it('calls update endpoint', function() {
        $httpBackend.expectPUT('brewery/api/malt_ingredient_addition/3');
        isolatedScope.updateIngredientAddition(addition);
        $httpBackend.flush();
        expect(scope.onChange).toHaveBeenCalled();
      });
    });

    describe('removeIngredientAddition', function() {
      it('calls delete endpoint', function() {
        $httpBackend.expectDELETE('brewery/api/malt_ingredient_addition/3');
        expect(isolatedScope.ingredientAdditions.length).toEqual(1);
        isolatedScope.deleteIngredientAddition(addition);
        $httpBackend.flush();
        expect(isolatedScope.ingredientAdditions.length).toEqual(0);
        expect(scope.onChange).toHaveBeenCalled();
      });
    });
  });
});
