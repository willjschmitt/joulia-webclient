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
            addition="addition"
            ingredient-resource="resource"
            ingredient-html="ingredientHtml"
            on-delete="onDelete(addition)"
            on-update="onUpdate(addition)">
        </ingredient-addition>`;

    beforeEach(function () {
      scope = $rootScope.$new();
      const addition = new breweryResources.MaltIngredientAddition({
        id: 3,
        amount: 0.0,
      });
      scope.addition = addition;
      scope.resource = breweryResources.MaltIngredientSearch;
      scope.onDelete = function(ingredientAddition) {
        return new Promise((resolve, reject) => resolve);
      };
      scope.onUpdate = function(ingredientAddition) {
        return new Promise((resolve, reject) => resolve);
      };
      spyOn(scope, 'onDelete').and.callThrough();
      spyOn(scope, 'onUpdate').and.callThrough();
      element = $compile(html)(scope);

      scope.$digest();
      isolatedScope = element.controller('ingredientAddition');
    });

    describe('updateIngredientAddition', function() {
      it('calls onUpdate', function() {
        isolatedScope.updateIngredientAddition();
        expect(scope.onUpdate).toHaveBeenCalled();
      });
    });

    describe('removeIngredientAddition', function() {
      it('calls onDelete', function() {
        isolatedScope.removeIngredientAddition();
        expect(scope.onDelete).toHaveBeenCalled();
      });
    });

    // Order matters, since the update function will modify our intermediate
    // variables.
    describe('updateMutuallyCoupledVariables', function() {
      it('updates amount when the conversion changes', function() {
        isolatedScope.userAmount = 1.0;
        scope.$digest();
        scope.addition.units = breweryResources.UNITS_CHOICES.KILOGRAMS.value;
        scope.$digest();
        expect(scope.addition.amount).toBe(1000.0);
        expect(scope.onUpdate).toHaveBeenCalled();
      });

      it('updates amount when the user presented amount changes', function() {
        scope.addition.units = breweryResources.UNITS_CHOICES.KILOGRAMS.value;
        scope.$digest();
        isolatedScope.userAmount = 1.0;
        scope.$digest();
        expect(scope.addition.amount).toBe(1000.0);
        expect(scope.onUpdate).toHaveBeenCalled();
      });

      it('updates user amount when the server changes the amount', function() {
        scope.addition.units = breweryResources.UNITS_CHOICES.KILOGRAMS.value;
        scope.$digest();
        scope.addition.amount = 1000.0;
        scope.$digest();
        expect(isolatedScope.userAmount).toBe(1.0);
        expect(scope.onUpdate).not.toHaveBeenCalled();
      });
    });

    describe('calculateUnitsToGrams', function() {
      it('updates unitsToGrams when units change', function() {
        scope.addition.units = breweryResources.UNITS_CHOICES.KILOGRAMS.value;
        scope.$digest();
        expect(isolatedScope.unitsToGrams).toBe(0.001);
        scope.addition.units = breweryResources.UNITS_CHOICES.GRAMS.value;
        scope.$digest();
        expect(isolatedScope.unitsToGrams).toBe(1.0);
        expect(scope.onUpdate).not.toHaveBeenCalled();
      })
    });
  });
});
