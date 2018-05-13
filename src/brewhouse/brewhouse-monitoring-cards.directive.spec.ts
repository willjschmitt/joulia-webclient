/* eslint-disable */
describe('app.brewhouse', function () {
  beforeEach(angular.mock.module('app.brewhouse'));
  beforeEach(angular.mock.module('joulia.templates'));

  // Mocks the backend for valueCard, which needs to make streaming calls to the
  // server.
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

  // Mocks the user service, so we can manipulate user preferences from here.
  beforeEach(angular.mock.module(function($provide) {
    $provide.service('userService', function () {
      const self = this;

      self.userPreferences = {
        'energy_cost_rate': 0.10,  // $/kWh.
      }
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

    describe('energyUsageToEnergyCost function', function() {
      it('should convert correctly', function () {
        // The energy_cost_rate is 0.10 as defined in the userService mock at
        // the top of this file.
        const k1KilowattHourInWattHours = 1000.0;
        const kCostOf1KilowattHour = 0.10;
        const got = isolatedScope.energyUsageToEnergyCost(
            k1KilowattHourInWattHours);
        expect(got).toBe(kCostOf1KilowattHour);
      })
    });
  });

});