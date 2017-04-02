/* eslint-disable */
describe('app.brewhouse', function () {
  beforeEach(module('app.brewhouse'));
  beforeEach(module('joulia.templates'));

  // Mocks the backend for valueCard, which needs to make streaming calls to the
  // server.
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

  var $rootScope, $compile, $interval;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
  }));

  describe('brewhouse-monitoring-cards directive', function () {
    var element, scope, isolatedScope;
    const html = '<brewhouse-monitoring-cards></brewhouse-monitoring-cards>';

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('template binding', function () {
      it ('should have value cards', function () {
        // This test isn't perfect, but should be sufficient. This just checks
        // a few value cards exist.
        // TODO(will): Make tests look deeper to make sure child directives are
        // compiled and included.
        expect(element.html()).toContain('Electric Load');
        expect(element.html()).toContain('Energy Consumption');
        expect(element.html()).toContain('Boil Kettle Temperature');
        expect(element.html()).toContain('Mash Tun Temperature');
      });
    });
  });

});