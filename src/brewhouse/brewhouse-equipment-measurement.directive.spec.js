/* eslint-disable */
describe('app.brewhouse', function () {
  beforeEach(module('app.brewhouse'));
  beforeEach(module('joulia.templates'));
  beforeEach(module(function($provide) {
    $provide.factory('TimeSeriesUpdater', function () {
      function TimeSeriesUpdater(recipeInstance, name) {
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

  describe('brewhouse-equipment-measurement directive', function () {
    var element, scope, isolatedScope;
    const html = `
        <brewhouse-equipment-measurement
            recipe-instance='recipeInstance'
            label='label'
            units='units'
            value-name='valueName'>
        </brewhouse-equipment-measurement>`;

    beforeEach(function() {
      scope = $rootScope.$new();
      scope.recipeInstance = { id: 12 };
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    })

    describe('template binding', function() {
      it('contains label', function () {
        const label = 'Power';
        scope.label = label;
        scope.$digest();
        expect($(element).find('.measurement-label').html())
            .toContain(label);
      });

      it('contains units', function () {
        const units = 'W';
        scope.units = units;
        scope.$digest();
        expect($(element).find('.measurement-units').html())
            .toContain(units);
      });

      it('contains value', function () {
        const value = 5500;
        const valueFormatted = '5,500';
        isolatedScope.value.set(value);
        scope.$digest();
        expect($(element).find('.measurement-value').html())
            .toContain(valueFormatted);
      });
    })
  });

});
