/* eslint-disable */
describe('app.brewhouse', function () {
  beforeEach(angular.mock.module('app.brewhouse'));
  beforeEach(angular.mock.module('joulia.templates'));
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

  describe('kettle directive', function () {
    var element, scope, isolatedScope;
    const html = `
        <kettle
            label='label'
            name='name'
            has-heating-element='hasHeatingElement'
            recipe-instance='recipeInstance'>
        </kettle>`;

    beforeEach(function() {
      scope = $rootScope.$new();
      scope.recipeInstance = { id: 12 };
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    })

    describe('template binding', function() {
      const heatingElementPowerLabel = "Heating Element Power";

      it('contains label', function () {
        const label = 'Mash Tun';
        scope.label = label;
        scope.$digest();
        expect($(element).find('.kettle-label').html())
            .toContain(label);
      });

      describe('hasHeatingElement', function() {
        it('has no heating element when false', function() {
          scope.hasHeatingElement = false;
          scope.$digest();
          expect($(element).find('.heating-element').length).toBe(0);
          expect($(element).find('.equipment-measurements').html())
              .not.toContain(heatingElementPowerLabel);
        });

        it('has heating element when true', function() {
          scope.hasHeatingElement = true;
          scope.$digest();
          expect($(element).find('.heating-element').length).toBe(1);
          expect($(element).find('.equipment-measurements').html())
              .toContain(heatingElementPowerLabel);
        });
      });
    })
  });

});
