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

  describe('brewhouse-temperature-plots directive', function () {
    var element, scope;
    const html = `
        <brewhouse-temperature-plots
            recipe-instance='recipeInstance'>
        </brewhouse-temperature-plots>`;

    it('header contains title', function () {
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();

      expect(element.html()).toContain('Temperatures');
    });
  });

});