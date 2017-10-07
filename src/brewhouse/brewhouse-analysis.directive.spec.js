/* eslint-disable */
describe('app.brewhouse', function () {
  beforeEach(module('app.brewhouse'));
  beforeEach(module('joulia.templates'));

  var $rootScope, $compile, $interval, $httpBackend;

  // Mocks the user service, so we can manipulate user preferences from here.
  beforeEach(module(function($provide) {
    $provide.service('userService', function () {
      const self = this;

      self.userPreferences = {
        'energy_cost_rate': 0.10,  // $/kWh.
      }
    });
  }));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $interval = $injector.get('$interval');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('brewhouse-analysis directive', function () {
    var element, scope, isolatedScope;
    const html = `
        <brewhouse-analysis
            recipe-instance="recipeInstance">
        </brewhouse-analysis>`;

    beforeEach(function() {
      $httpBackend.whenPOST('live/timeseries/identify/').respond({});
    });

    beforeEach(function () {
      scope = $rootScope.$new();
      element = $compile(html)(scope);
      scope.$digest();
      isolatedScope = element.isolateScope();
    });

    describe('template binding', function () {
      it ('is defined', function () {
        expect(element.html()).not.toEqual('');
      });
    });
  });

});