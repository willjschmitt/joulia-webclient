/* eslint-disable */
import angular = require('angular');
import 'angular-mocks';
import {Promise} from 'es6-promise'

import './ingredient-addition.component';
import '../../common/brewery-resources.factory';

describe('app.recipes.ingredient.addition', function () {
  beforeEach(angular.mock.module('app.recipes.ingredient.addition'));
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
    const html = `
        <ingredient-addition
            ingredient="ingredient"
            amount="amount"
            units="units"
            stepAdded="stepAdded"
            timeAdded="timeAdded"

            on-update-ingredient="onUpdateIngredient(value)"
            on-update-amount="onUpdateAmount(value)"
            on-update-units="onUpdateUnits(value)"
            on-update-step-added="onUpdateStepAdded(value)"
            on-update-time-added="onUpdateTimeAdded(value)"

            on-delete="onDelete(addition)"

            ingredient-resource="resource"
            ingredient-html="ingredientHtml">
        </ingredient-addition>`;

    beforeEach(function () {
      const ingredientId = 1;
      $httpBackend
        .when('GET', /brewery\/api\/malt_ingredient\?id=\d+/)
        .respond(function(method, url, data, headers, params) {
          return [200, [{ id: params.id }]];
        });
    })

    beforeEach(function () {
      scope = $rootScope.$new();

      scope.ingredient = 3;
      scope.amount = 0.0;
      scope.units = breweryResources.UNITS_CHOICES.KILOGRAMS.value;

      scope.resource = breweryResources.MaltIngredientSearch;
      const promiseCallback = function(ingredientAddition) {
        return new Promise((resolve, reject) => resolve);
      };
      scope.onDelete = promiseCallback;
      scope.onUpdateIngredient = promiseCallback;
      scope.onUpdateAmount = promiseCallback;
      scope.onUpdateUnits = promiseCallback;
      scope.onUpdateStepAdded = promiseCallback;
      scope.onUpdateTimeAdded = promiseCallback;
      spyOn(scope, 'onDelete').and.callThrough();
      spyOn(scope, 'onUpdateIngredient').and.callThrough();
      spyOn(scope, 'onUpdateAmount').and.callThrough();
      spyOn(scope, 'onUpdateUnits').and.callThrough();
      spyOn(scope, 'onUpdateStepAdded').and.callThrough();
      spyOn(scope, 'onUpdateTimeAdded').and.callThrough();
      element = $compile(html)(scope);

      $httpBackend.expectGET(/brewery\/api\/malt_ingredient\?id=\d+/);

      scope.$digest();
      $httpBackend.flush();
      isolatedScope = element.controller('ingredientAddition');
    });

    describe('removeIngredientAddition', function() {
      it('calls onDelete', function() {
        isolatedScope.removeIngredientAddition();
        expect(scope.onDelete).toHaveBeenCalled();
      });
    });

    it('updates amount when the conversion changes', function() {
      scope.amount = 1000.0;
      scope.$digest();
      expect(isolatedScope.userAmount).toBe(1.0);
      isolatedScope.updateUnits(breweryResources.UNITS_CHOICES.GRAMS.value);
      scope.$digest();
      expect(isolatedScope.userAmount).toBe(1000.0);
      expect(scope.onUpdateUnits).toHaveBeenCalledWith(
          breweryResources.UNITS_CHOICES.GRAMS.value);
      expect(scope.onUpdateAmount).not.toHaveBeenCalled();
    });

    it('updates amount when the user presented amount changes', function() {
      isolatedScope.updateUserAmount(1.0);
      scope.$digest();
      expect(isolatedScope.amount).toBe(1000.0);
      expect(scope.onUpdateAmount).toHaveBeenCalledWith(1000.0);
    });

    it('updates user amount when the server changes the amount', function() {
      scope.amount = 1000.0;
      scope.$digest();
      expect(isolatedScope.userAmount).toBe(1.0);
      expect(scope.onUpdateAmount).not.toHaveBeenCalled();
    });
  });
});
