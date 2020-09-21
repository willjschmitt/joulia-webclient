/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';

import './value-card.directive';

describe('app.common.value-card', function () {
  beforeEach(angular.mock.module('app.common.value-card'));
  beforeEach(angular.mock.module(function($provide) {
    $provide.factory('TimeSeriesUpdater', function () {
      function TimeSeriesUpdater(recipeInstance, name, variableType) {
        this.latest = 0;
      }

      TimeSeriesUpdater.prototype.set = function(value, callback){
        this.latest = value
        if (callback) {
          callback();
        }
      }

      return TimeSeriesUpdater;
    });
  }));

  var $rootScope, $compile;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  }));

  describe('value-card directive', function () {
    var element, scope;
    const html = `
        <value-card
            title="title"
            value-name="valueName"
            value-alternate-name="valueAlternateName"
            value-alternate-function="valueAlternateFunction"
            units="units"
            units-alternate="unitsAlternate"
            overridable="overridable"
            overridable-alternate="overridableAlternate"
            recipe-instance="recipeInstance">
        </value-card>`;

    it('header contains title', function () {
      scope = $rootScope.$new();
      scope.title = 'Fake Title';
      scope.value = 0.0;
      element = $compile(html)(scope);
      scope.$digest();

      expect(element.html()).toContain('Fake Title');
    });

    it('should throw error when both override properties are set', function () {
      scope = $rootScope.$new();
      scope.overridable = true;
      scope.overridableAlternate = true;
      element = $compile(html)(scope);

      expect(scope.$digest).toThrow(new Error(
        'overridable and overridableAlternate cannot both be set to true.'));
    });

    it('should only define value without override or alternate', function() {
      scope = $rootScope.$new();
      scope.recipeInstance = 0;
      scope.valueName = "foo";
      element = $compile(html)(scope);
      scope.$digest();
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.value).toBeDefined();
      expect(isolatedScope.valueOverride).not.toBeDefined();
      expect(isolatedScope.valueAlternate).not.toBeDefined();
    });

    it('should define alternateValue with alternate', function() {
      scope = $rootScope.$new();
      scope.recipeInstance = 0;
      scope.valueName = "foo";
      scope.valueAlternateName = "bar";
      element = $compile(html)(scope);
      scope.$digest();
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.value).toBeDefined();
      expect(isolatedScope.valueOverride).not.toBeDefined();
      expect(isolatedScope.valueAlternate).toBeDefined();
    });

    it('should define alternateValue with alternateValueFunction', function() {
      scope = $rootScope.$new();
      scope.recipeInstance = 0;
      scope.valueName = "foo";
      scope.valueAlternateFunction = function(value) {
        return value * 2;
      };
      element = $compile(html)(scope);
      scope.$digest();
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.value).toBeDefined();
      expect(isolatedScope.valueOverride).not.toBeDefined();
      expect(isolatedScope.valueAlternate).toBeDefined();

      isolatedScope.value.latest = 4;
      scope.$digest();
      expect(isolatedScope.valueAlternate.latest).toBe(8);
    });

    it('should define override with override', function() {
      scope = $rootScope.$new();
      scope.recipeInstance = 0;
      scope.valueName = "foo";
      scope.overridable = true;
      element = $compile(html)(scope);
      scope.$digest();
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.value).toBeDefined();
      expect(isolatedScope.valueOverride).toBeDefined();
      expect(isolatedScope.valueAlternate).not.toBeDefined();
    });

    it('should define override with override', function() {
      scope = $rootScope.$new();
      scope.recipeInstance = 0;
      scope.valueName = "foo";
      scope.overridableAlternate = true;
      element = $compile(html)(scope);
      scope.$digest();
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.value).toBeDefined();
      expect(isolatedScope.valueOverride).toBeDefined();
      expect(isolatedScope.valueAlternate).not.toBeDefined();
    });

    it('should not have value modifiers without overrides', function () {
      scope = $rootScope.$new();
      scope.recipeInstance = 0;
      scope.valueName = "foo";
      scope.overridable = false;
      scope.overridableAlternate = false;
      element = $compile(html)(scope);
      scope.$digest();
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.increaseValue).not.toBeDefined();
      expect(isolatedScope.decreaseValue).not.toBeDefined();
      expect(isolatedScope.toggleOverride).not.toBeDefined();
      expect(isolatedScope.setValue).not.toBeDefined();
    });

    describe('toggleOverride', function () {
      it('should toggle to true', function () {
        scope = $rootScope.$new();
        scope.recipeInstance = 0;
        scope.valueName = "foo";
        scope.overridable = true;
        element = $compile(html)(scope);
        scope.$digest();
        const isolatedScope = element.isolateScope();
        isolatedScope.valueOverride.latest = false;
        isolatedScope.toggleOverride();
        expect(isolatedScope.valueOverride.latest).toBeTruthy();
      })
    });

    describe('setValue', function () {
      it('sets value with overridable set and override on', function () {
        scope = $rootScope.$new();
        scope.recipeInstance = 0;
        scope.valueName = "foo";
        scope.valueAlternateName = "bar";
        scope.overridable = true;
        element = $compile(html)(scope);
        scope.$digest();
        const isolatedScope = element.isolateScope();
        isolatedScope.value.latest = 11.0;
        isolatedScope.valueAlternate.latest = 21.0;
        isolatedScope.valueOverride.latest = true;
        isolatedScope.setValue(12.0);
        expect(isolatedScope.value.latest).toEqual(12.0);
        expect(isolatedScope.valueAlternate.latest).toEqual(21.0);
      });

      it('sets value with overridable set and override off', function () {
        scope = $rootScope.$new();
        scope.recipeInstance = 0;
        scope.valueName = "foo";
        scope.valueAlternateName = "bar";
        scope.overridable = true;
        element = $compile(html)(scope);
        scope.$digest();
        const isolatedScope = element.isolateScope();
        isolatedScope.value.latest = 11.0;
        isolatedScope.valueAlternate.latest = 21.0;
        isolatedScope.valueOverride.latest = false;
        isolatedScope.setValue(12.0);
        expect(isolatedScope.valueOverride.latest).toBeTruthy();
        expect(isolatedScope.value.latest).toEqual(12.0);
        expect(isolatedScope.valueAlternate.latest).toEqual(21.0);
      });

      it('sets valueAlternate with overridableAlternate set and override on',
          function () {
        scope = $rootScope.$new();
        scope.recipeInstance = 0;
        scope.valueName = "foo";
        scope.valueAlternateName = "bar";
        scope.overridableAlternate = true;
        element = $compile(html)(scope);
        scope.$digest();
        const isolatedScope = element.isolateScope();
        isolatedScope.value.latest = 11.0;
        isolatedScope.valueAlternate.latest = 21.0;
        isolatedScope.valueOverride.latest = true;
        isolatedScope.setValue(12.0);
        expect(isolatedScope.value.latest).toEqual(11.0);
        expect(isolatedScope.valueAlternate.latest).toEqual(12.0);
      });

      it('sets valueAlternate with overridableAlternate set and override off',
          function () {
        scope = $rootScope.$new();
        scope.recipeInstance = 0;
        scope.valueName = "foo";
        scope.valueAlternateName = "bar";
        scope.overridableAlternate = true;
        element = $compile(html)(scope);
        scope.$digest();
        const isolatedScope = element.isolateScope();
        isolatedScope.value.latest = 11.0;
        isolatedScope.valueAlternate.latest = 21.0;
        isolatedScope.valueOverride.latest = false;
        isolatedScope.setValue(12.0);
        expect(isolatedScope.valueOverride.latest).toBeTruthy();
        expect(isolatedScope.value.latest).toEqual(11.0);
        expect(isolatedScope.valueAlternate.latest).toEqual(12.0);
      });
    });

    describe('increaseValue', function () {
      it('increases value with overridable set', function () {
        scope = $rootScope.$new();
        scope.recipeInstance = 0;
        scope.valueName = "foo";
        scope.valueAlternateName = "bar";
        scope.overridable = true;
        element = $compile(html)(scope);
        scope.$digest();
        const isolatedScope = element.isolateScope();
        isolatedScope.value.latest = 11.0;
        isolatedScope.valueAlternate.latest = 21.0;
        isolatedScope.increaseValue();
        expect(isolatedScope.value.latest).toEqual(12.0);
        expect(isolatedScope.valueAlternate.latest).toEqual(21.0);
      });

      it('increases valueAlternate with overridableAlternate set', function () {
        scope = $rootScope.$new();
        scope.recipeInstance = 0;
        scope.valueName = "foo";
        scope.valueAlternateName = "bar";
        scope.overridableAlternate = true;
        element = $compile(html)(scope);
        scope.$digest();
        const isolatedScope = element.isolateScope();
        isolatedScope.value.latest = 11.0;
        isolatedScope.valueAlternate.latest = 21.0;
        isolatedScope.increaseValue();
        expect(isolatedScope.value.latest).toEqual(11.0);
        expect(isolatedScope.valueAlternate.latest).toEqual(22.0);
      });
    });

    describe('decreaseValue', function () {
      it('decreases value with overridable set', function () {
        scope = $rootScope.$new();
        scope.recipeInstance = 0;
        scope.valueName = "foo";
        scope.valueAlternateName = "bar";
        scope.overridable = true;
        element = $compile(html)(scope);
        scope.$digest();
        const isolatedScope = element.isolateScope();
        isolatedScope.value.latest = 11.0;
        isolatedScope.valueAlternate.latest = 21.0;
        isolatedScope.decreaseValue();
        expect(isolatedScope.value.latest).toEqual(10.0);
        expect(isolatedScope.valueAlternate.latest).toEqual(21.0);
      });

      it('decreases valueAlternate with overridableAlternate set', function () {
        scope = $rootScope.$new();
        scope.recipeInstance = 0;
        scope.valueName = "foo";
        scope.valueAlternateName = "bar";
        scope.overridableAlternate = true;
        element = $compile(html)(scope);
        scope.$digest();
        const isolatedScope = element.isolateScope();
        isolatedScope.value.latest = 11.0;
        isolatedScope.valueAlternate.latest = 21.0;
        isolatedScope.decreaseValue();
        expect(isolatedScope.value.latest).toEqual(11.0);
        expect(isolatedScope.valueAlternate.latest).toEqual(20.0);
      });
    });
  });

});
