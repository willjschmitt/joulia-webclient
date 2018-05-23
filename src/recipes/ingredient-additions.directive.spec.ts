/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';
import {Promise} from 'es6-promise'

import './ingredient-additions.directive';
import '../common/brewery-resources.factory';

describe('app.recipes.ingredient.addition', function () {
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

  describe('ingredient-addition directive', function () {
    var element, scope, isolatedScope;
    var addition;
    var additionAdd, additionUpdate, additionDelete;
    const html = `
        <ingredient-additions
            title="title"
            ingredient-additions="additions"
            recipe="recipe"
            ingredient-resource="searchResource"
            ingredient-html="ingredientHTML"
            resource="resource"
            default-step="defaultStep">
        </ingredient-additions>`;

    beforeEach(function () {
      additionAdd = $httpBackend
        .when('POST', /brewery\/api\/malt_ingredient_addition/)
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });
      additionUpdate = $httpBackend
        .when('PUT', /brewery\/api\/malt_ingredient_addition\/\d+/)
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });
      $httpBackend
        .when('PUT', /brewery\/api\/recipe\/\d+/)
          .respond(function (method, url, data, headers, params) {
            return [200, data];
          });
      additionDelete = $httpBackend
        .when('DELETE', /brewery\/api\/malt_ingredient_addition\/\d+/)
          .respond({});
    });

    beforeEach(function () {
      scope = $rootScope.$new();
      addition = new breweryResources.MaltIngredientAddition({
        id: 3,
        amount: 0.0,
      });
      scope.recipe = new breweryResources.Recipe({ id: 11 });
      scope.additions = [addition];
      scope.searchResource = breweryResources.MaltIngredientSearch;
      scope.resource = breweryResources.MaltIngredientAddition;
      scope.defaultStep = breweryResources.BREWING_STEP_CHOICES.MASH;
      element = $compile(html)(scope);

      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('addIngredientAddition', function() {
      it('calls add endpoint', function() {
        $httpBackend.expectPOST('brewery/api/malt_ingredient_addition');
        $httpBackend.expectPUT(/brewery\/api\/recipe\/\d+/);
        expect(scope.additions).toEqual([addition]);
        isolatedScope.addIngredientAddition();
        $httpBackend.flush();
        expect(scope.additions.length).toEqual(2);
      });
    });

    describe('updateIngredientAddition', function() {
      it('calls update endpoint', function() {
        $httpBackend.expectPUT('brewery/api/malt_ingredient_addition/3');
        $httpBackend.expectPUT(/brewery\/api\/recipe\/\d+/);
        isolatedScope.updateIngredientAddition(addition);
        $httpBackend.flush();
      });
    });

    describe('removeIngredientAddition', function() {
      it('calls delete endpoint', function() {
        $httpBackend.expectDELETE('brewery/api/malt_ingredient_addition/3');
        $httpBackend.expectPUT(/brewery\/api\/recipe\/\d+/);
        expect(scope.additions).toEqual([addition]);
        isolatedScope.deleteIngredientAddition(addition);
        $httpBackend.flush();
        expect(scope.additions).toEqual([]);
      });
    });
  });
});
